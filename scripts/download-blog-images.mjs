// @ts-check
// Télécharge toutes les images du blog (référencées dans `cover` et dans le HTML
// scrappé) et génère un manifeste `src/lib/data/blog-images.generated.json`
// qui mappe chaque ancienne URL (docteurmbockpolesantedenain.fr/uploads/...)
// vers son chemin local servi par Vercel (`/blog-images/<hash>.<ext>`).

import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { parse } from "node-html-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_JSON = join(ROOT, "src/lib/data/blog.generated.json");
const OUT_DIR = join(ROOT, "public/blog-images");
const OUT_MANIFEST = join(ROOT, "src/lib/data/blog-images.generated.json");

const OLD_DOMAIN_RE = /docteurmbockpolesantedenain\.fr/i;
const CONCURRENCY = 12;
const FETCH_TIMEOUT_MS = 20_000;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  Accept:
    "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  Referer: "https://www.docteurmbockpolesantedenain.fr/",
};

function hashName(url, ext) {
  const h = createHash("sha1").update(url).digest("hex").slice(0, 16);
  return `${h}.${ext}`;
}

function pickExt(url, contentType = "") {
  const m = url.toLowerCase().match(/\.(jpe?g|png|gif|webp|svg|avif)(?:[?#].*)?$/);
  if (m) return m[1].replace("jpeg", "jpg");
  const ct = contentType.toLowerCase();
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("png")) return "png";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("avif")) return "avif";
  if (ct.includes("gif")) return "gif";
  if (ct.includes("svg")) return "svg";
  return "bin";
}

function collectUrls(articles) {
  const urls = new Set();
  for (const a of articles) {
    if (typeof a.cover === "string" && OLD_DOMAIN_RE.test(a.cover)) {
      urls.add(a.cover);
    }
    if (typeof a.contentHtml === "string" && a.contentHtml.length > 0) {
      const root = parse(a.contentHtml);
      for (const img of root.querySelectorAll("img")) {
        const src = img.getAttribute("src");
        if (src && OLD_DOMAIN_RE.test(src)) urls.add(src);
      }
      for (const source of root.querySelectorAll("source")) {
        const srcset = source.getAttribute("srcset");
        if (!srcset) continue;
        for (const part of srcset.split(",")) {
          const u = part.trim().split(/\s+/)[0];
          if (u && OLD_DOMAIN_RE.test(u)) urls.add(u);
        }
      }
    }
  }
  return [...urls];
}

async function downloadOne(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: ctrl.signal });
    if (!res.ok) {
      return { ok: false, status: res.status };
    }
    const contentType = res.headers.get("content-type") || "";
    const ext = pickExt(url, contentType);
    const fileName = hashName(url, ext);
    const out = join(OUT_DIR, fileName);
    if (existsSync(out)) {
      return { ok: true, fileName, cached: true, size: statSync(out).size };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(out, buf);
    return { ok: true, fileName, cached: false, size: buf.byteLength };
  } catch (err) {
    return { ok: false, error: String(err && err.message ? err.message : err) };
  } finally {
    clearTimeout(t);
  }
}

async function runQueue(urls, fn) {
  const manifest = {};
  let done = 0;
  let bytes = 0;
  let failures = 0;
  let cached = 0;
  const queue = urls.slice();

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      if (!url) return;
      const r = await fn(url);
      done++;
      if (r.ok) {
        manifest[url] = `/blog-images/${r.fileName}`;
        bytes += r.size || 0;
        if (r.cached) cached++;
      } else {
        failures++;
      }
      if (done % 25 === 0 || done === urls.length) {
        process.stdout.write(
          `\r  ${done}/${urls.length}   ${(bytes / 1_048_576).toFixed(1)} MiB   ` +
            `cached=${cached}   fails=${failures}    `,
        );
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
  process.stdout.write("\n");
  return { manifest, bytes, failures, cached };
}

async function main() {
  const raw = (await import("node:fs/promises")).readFile;
  const text = await raw(SRC_JSON, "utf-8");
  const articles = JSON.parse(text);

  const urls = collectUrls(articles);
  console.log(`Found ${urls.length} unique image URLs to download`);
  if (urls.length === 0) return;

  mkdirSync(OUT_DIR, { recursive: true });

  const { manifest, bytes, failures, cached } = await runQueue(urls, downloadOne);

  writeFileSync(OUT_MANIFEST, JSON.stringify(manifest, null, 2));

  console.log(
    `\nDone. ${Object.keys(manifest).length}/${urls.length} mapped, ` +
      `${(bytes / 1_048_576).toFixed(1)} MiB total, ` +
      `${cached} from cache, ${failures} failed.`,
  );
  console.log(`Manifest: ${OUT_MANIFEST}`);
  console.log(`Files dir: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
