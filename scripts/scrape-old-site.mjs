// @ts-check
// Scraper de https://www.docteurmbockpolesantedenain.fr
// Parcourt chaque sous-catégorie, suit la pagination, télécharge chaque article
// (titre, date, contenu HTML, image cover) et écrit le résultat dans
// `src/lib/data/blog.generated.json` pour conversion ultérieure en TypeScript.

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ORIGIN = "https://www.docteurmbockpolesantedenain.fr";
const OUT_JSON = join(ROOT, "src/lib/data/blog.generated.json");

const CATEGORIES = [
  { slug: "la-maladie", name: "La maladie", group: "Guide médical" },
  {
    slug: "le-suivi-meacutedical",
    name: "Le suivi médical",
    group: "Guide médical",
  },
  { slug: "les-traitements", name: "Les traitements", group: "Guide médical" },
  {
    slug: "examens-compleacutementaires",
    name: "Examens complémentaires",
    group: "Guide médical",
  },
  { slug: "vih", name: "VIH", group: "Guide médical" },

  {
    slug: "preacutevenir-la-maladie",
    name: "Prévenir la maladie",
    group: "Guide prévention",
  },
  {
    slug: "preacutevenir-les-complications",
    name: "Prévenir les complications",
    group: "Guide prévention",
  },
  { slug: "deacutepistage", name: "Dépistage", group: "Guide prévention" },
  { slug: "vaccinations", name: "Vaccinations", group: "Guide prévention" },

  {
    slug: "votre-alimentation",
    name: "Votre alimentation",
    group: "Conseils pratiques",
  },
  {
    slug: "votre-activiteacute-physique",
    name: "Votre activité physique",
    group: "Conseils pratiques",
  },
  {
    slug: "votre-vie-quotidienne",
    name: "Votre vie quotidienne",
    group: "Conseils pratiques",
  },
  { slug: "vie-sexuelle", name: "Vie sexuelle", group: "Conseils pratiques" },
  {
    slug: "tabac-alcool-drogues",
    name: "Tabac, alcool, drogues",
    group: "Conseils pratiques",
  },
  { slug: "voyages", name: "Voyages", group: "Conseils pratiques" },

  {
    slug: "adresses-utiles",
    name: "Adresses utiles",
    group: "Guide administratif",
  },
  {
    slug: "associations-de-patients",
    name: "Associations de patients",
    group: "Guide administratif",
  },
  {
    slug: "maladie-et-travail",
    name: "Maladie et travail",
    group: "Guide administratif",
  },

  { slug: "autres", name: "Autres", group: "Autres" },
  { slug: "urgences", name: "Urgences", group: "Urgences" },
];

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
};

const CACHE_DIR = join(ROOT, ".scrape-cache");
mkdirSync(CACHE_DIR, { recursive: true });

const safeKey = (s) => s.replace(/[^a-z0-9]/gi, "_");

async function fetchHtml(url) {
  const cacheFile = join(CACHE_DIR, safeKey(url) + ".html");
  if (existsSync(cacheFile)) return readFileSync(cacheFile, "utf-8");

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    console.warn(`  [skip] ${res.status} -> ${url}`);
    return null;
  }
  const html = await res.text();
  writeFileSync(cacheFile, html);
  return html;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function absUrl(href) {
  if (!href) return null;
  if (href.startsWith("//")) return "https:" + href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("/")) return ORIGIN + href;
  return ORIGIN + "/" + href;
}

function cleanText(s) {
  return s.replace(/\s+/g, " ").trim();
}

function parseFrDate(s) {
  const m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

async function listArticlesForCategory(category) {
  const seen = new Map();
  for (let page = 1; page < 30; page++) {
    const url =
      page === 1
        ? `${ORIGIN}/${category.slug}`
        : `${ORIGIN}/${category.slug}/previous/${page}`;
    const html = await fetchHtml(url);
    if (!html) break;
    const root = parse(html);

    const anchors = root.querySelectorAll(`a[href*="/${category.slug}/"]`);
    let foundAny = false;
    for (const a of anchors) {
      const href = a.getAttribute("href") || "";
      const url = absUrl(href);
      if (!url) continue;
      if (url.includes("/previous/")) continue;
      const path = url.replace(ORIGIN, "");
      const parts = path.split("/").filter(Boolean);
      if (parts.length < 2) continue;
      if (parts[0] !== category.slug) continue;
      const articleSlug = parts[1];
      const title = cleanText(a.text);
      if (!title) continue;
      if (seen.has(articleSlug)) continue;
      seen.set(articleSlug, { url, title, articleSlug });
      foundAny = true;
    }
    const hasPrev = html.includes(`${category.slug}/previous/${page + 1}`);
    if (!hasPrev) break;
    if (!foundAny && page > 1) break;
    await sleep(200);
  }

  return [...seen.values()];
}

// Décode quelques entités HTML courantes pour le résumé.
function decodeEntities(s) {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&eacute;/gi, "é")
    .replace(/&egrave;/gi, "è")
    .replace(/&ecirc;/gi, "ê")
    .replace(/&ouml;/gi, "ö")
    .replace(/&agrave;/gi, "à")
    .replace(/&acirc;/gi, "â")
    .replace(/&ccedil;/gi, "ç")
    .replace(/&iuml;/gi, "ï")
    .replace(/&icirc;/gi, "î")
    .replace(/&ucirc;/gi, "û")
    .replace(/&ugrave;/gi, "ù")
    .replace(/&Eacute;/gi, "É")
    .replace(/&Egrave;/gi, "È")
    .replace(/&laquo;/gi, "«")
    .replace(/&raquo;/gi, "»")
    .replace(/&hellip;/gi, "…")
    .replace(/&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&ldquo;/gi, "“")
    .replace(/&rdquo;/gi, "”")
    .replace(/&oelig;/gi, "œ")
    .replace(/&Oelig;/gi, "Œ");
}

// Nettoie le HTML d'un article : supprime les attributs inline parasites
// (style, onclick, classes weebly), conserve seulement les balises sémantiques utiles.
function cleanContentHtml(rawHtml) {
  return rawHtml
    .replace(
      /<(script|style|nav|header|footer|aside|form|iframe)[\s\S]*?<\/\1>/gi,
      "",
    )
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "")
    .replace(/\sdata-[\w-]+="[^"]*"/gi, "")
    .replace(/<font[^>]*>/gi, "")
    .replace(/<\/font>/gi, "")
    .replace(/<o:p>[\s\S]*?<\/o:p>/gi, "")
    .replace(/<a\b([^>]*)>/gi, (m, attrs) => {
      const href = (attrs.match(/href="([^"]*)"/) || [])[1] || "";
      if (!href) return "<span>";
      return `<a href="${href}" target="_blank" rel="noopener">`;
    })
    .replace(/<\/a>/gi, (m) => m)
    .replace(/<img\b([^>]*)>/gi, (m, attrs) => {
      let src = (attrs.match(/src="([^"]*)"/) || [])[1] || "";
      const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || "";
      if (!src) return "";
      if (src.startsWith("/")) src = ORIGIN + src;
      return `<img src="${src}" alt="${alt}" loading="lazy" />`;
    })
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br/><br/>")
    .replace(/<div>\s*<\/div>/gi, "")
    .replace(/<span>\s*<\/span>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

function extractArticle(html, fallbackTitle) {
  const root = parse(html);

  // Titre — on cible le lien spécifique du blog post
  let title = "";
  const titleEl = root.querySelector(".blog-title-link, .blog-title");
  if (titleEl) title = cleanText(titleEl.text);
  if (!title) title = fallbackTitle;

  // Date — uniquement dans le bloc .blog-date
  let date = null;
  const dateEl = root.querySelector(".blog-date");
  if (dateEl) date = parseFrDate(dateEl.text);

  // Cover — première image dans .blog-content
  let cover = null;
  const contentEl = root.querySelector(".blog-content");
  if (contentEl) {
    for (const img of contentEl.querySelectorAll("img")) {
      const src = img.getAttribute("src");
      const url = absUrl(src);
      if (!url) continue;
      if (url.match(/(logo|icon|spinner|loader|pixel|background)/i)) continue;
      if (url.match(/\.(svg)$/i)) continue;
      cover = url;
      break;
    }
  }

  // Body : on prend uniquement .blog-content (le contenu sémantique de l'article)
  let bodyHtml = "";
  if (contentEl) bodyHtml = contentEl.innerHTML;

  const cleaned = cleanContentHtml(bodyHtml);

  // Résumé : on extrait le BlogSummary s'il existe, sinon les premiers caractères du texte.
  let summary = "";
  if (contentEl) {
    const summaryEl = contentEl.querySelector(".BlogSummary");
    if (summaryEl) summary = cleanText(decodeEntities(summaryEl.text));
    if (!summary) summary = cleanText(decodeEntities(contentEl.text)).slice(0, 240);
  }

  return { title, date, cover, contentHtml: cleaned, summary };
}

async function main() {
  const articles = [];
  for (const cat of CATEGORIES) {
    console.log(`\n=== ${cat.name} (${cat.slug}) ===`);
    const list = await listArticlesForCategory(cat);
    console.log(`  ${list.length} article(s) référencé(s)`);

    let i = 0;
    for (const a of list) {
      i++;
      process.stdout.write(`  [${i}/${list.length}] ${a.title.slice(0, 60)}... `);
      const html = await fetchHtml(a.url);
      if (!html) {
        console.log("FAIL");
        continue;
      }
      const data = extractArticle(html, a.title);
      const slug = slugify(data.title) || a.articleSlug;
      articles.push({
        sourceUrl: a.url,
        sourceSlug: a.articleSlug,
        slug,
        title: data.title || a.title,
        date: data.date,
        cover: data.cover,
        category: cat.name,
        categoryGroup: cat.group,
        summary: data.summary,
        contentHtml: data.contentHtml,
      });
      console.log("OK");
      await sleep(50);
    }
  }

  const seen = new Set();
  const unique = articles.filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });

  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(unique, null, 2));
  console.log(`\nWrote ${unique.length} articles to ${OUT_JSON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
