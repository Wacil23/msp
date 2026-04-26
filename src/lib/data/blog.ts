import type {
  BlogArticle,
  BlogCategoryGroup,
  BlogCategoryListItem,
} from "@/src/lib/types/blog/BlogArticle";

import generated from "./blog.generated.json";
import imageManifest from "./blog-images.generated.json";

interface RawArticle {
  sourceUrl: string;
  sourceSlug: string;
  slug: string;
  title: string;
  date: string | null;
  cover: string | null;
  category: string;
  categoryGroup: string;
  summary?: string;
  contentHtml: string;
}

const RAW_ARTICLES = generated as RawArticle[];
const IMAGE_MAP = imageManifest as Record<string, string>;

const OLD_DOMAIN_RE = /https?:\/\/(?:www\.)?docteurmbockpolesantedenain\.fr/i;

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeOldUrl = (url: string) =>
  url
    .trim()
    .toLowerCase()
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "");

const SLUG_BY_OLD_URL = new Map<string, string>();
for (const raw of RAW_ARTICLES) {
  if (!raw.sourceUrl) continue;
  const slug = raw.slug || raw.sourceSlug;
  if (!slug) continue;
  SLUG_BY_OLD_URL.set(normalizeOldUrl(raw.sourceUrl), slug);
}

const localImage = (url: string): string | null => IMAGE_MAP[url] ?? null;

const cleanContentHtml = (html: string): string => {
  if (!html) return html;
  let out = html;

  out = out.replace(
    /<img\b([^>]*?)src=["']([^"']*docteurmbockpolesantedenain\.fr[^"']*)["']([^>]*?)\/?>/gi,
    (_match, before, src, after) => {
      const local = localImage(src);
      if (!local) return "";
      const cleanAttrs = `${before}${after}`.replace(/\ssrcset=["'][^"']*["']/gi, "");
      return `<img${cleanAttrs}src="${local}" loading="lazy" />`;
    },
  );
  out = out.replace(
    /<source\b[^>]*srcset=["'][^"']*docteurmbockpolesantedenain\.fr[^"']*["'][^>]*\/?>/gi,
    "",
  );

  out = out.replace(
    /<a\b([^>]*?)href=["']([^"']*docteurmbockpolesantedenain\.fr[^"']*)["']([^>]*)>([\s\S]*?)<\/a>/gi,
    (_match, before, href, after, inner) => {
      const slug = SLUG_BY_OLD_URL.get(normalizeOldUrl(href));
      if (slug) {
        return `<a${before}href="/blog/${slug}"${after}>${inner}</a>`;
      }
      return inner;
    },
  );

  return out;
};

const cleanCover = (cover: string | null): string | null => {
  if (!cover) return null;
  if (!OLD_DOMAIN_RE.test(cover)) return cover;
  return localImage(cover);
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&eacute;/gi, "é")
    .replace(/&egrave;/gi, "è")
    .replace(/&agrave;/gi, "à")
    .replace(/&acirc;/gi, "â")
    .replace(/&ecirc;/gi, "ê")
    .replace(/&ucirc;/gi, "û")
    .replace(/&ccedil;/gi, "ç")
    .replace(/&iuml;/gi, "ï")
    .replace(/&hellip;/gi, "…")
    .replace(/&laquo;/gi, "«")
    .replace(/&raquo;/gi, "»")
    .replace(/&rsquo;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const buildExcerpt = (html: string, length = 200) => {
  const text = stripHtml(html);
  if (text.length <= length) return text;
  return text.slice(0, length).replace(/\s+\S*$/, "") + "…";
};

const dateOf = (a: { date: string | null }) =>
  a.date ? new Date(a.date).getTime() : 0;

const ARTICLES: BlogArticle[] = RAW_ARTICLES.map((raw) => {
  const categorySlug = slugify(raw.category);
  const cleanedContent = cleanContentHtml(raw.contentHtml);
  const excerpt =
    raw.summary && raw.summary.trim()
      ? raw.summary.trim()
      : buildExcerpt(cleanedContent);
  return {
    slug: raw.slug || raw.sourceSlug,
    title: raw.title,
    date: raw.date,
    cover: cleanCover(raw.cover),
    contentHtml: cleanedContent,
    excerpt,
    category: {
      slug: categorySlug,
      name: raw.category,
      group: raw.categoryGroup,
    },
  };
}).sort((a, b) => dateOf(b) - dateOf(a));

const CATEGORY_MAP = new Map<string, BlogCategoryListItem>();
for (const article of ARTICLES) {
  if (!CATEGORY_MAP.has(article.category.slug)) {
    CATEGORY_MAP.set(article.category.slug, article.category);
  }
}

const CATEGORIES: BlogCategoryListItem[] = Array.from(
  CATEGORY_MAP.values(),
).sort((a, b) => a.name.localeCompare(b.name));

const GROUP_ORDER = [
  "Guide médical",
  "Guide prévention",
  "Conseils pratiques",
  "Guide administratif",
  "Autres",
];

const GROUPS: BlogCategoryGroup[] = (() => {
  const map = new Map<string, BlogCategoryListItem[]>();
  for (const cat of CATEGORIES) {
    if (!map.has(cat.group)) map.set(cat.group, []);
    map.get(cat.group)!.push(cat);
  }
  return Array.from(map.entries())
    .map(([group, categories]) => ({ group, categories }))
    .sort(
      (a, b) =>
        (GROUP_ORDER.indexOf(a.group) === -1
          ? 100
          : GROUP_ORDER.indexOf(a.group)) -
        (GROUP_ORDER.indexOf(b.group) === -1
          ? 100
          : GROUP_ORDER.indexOf(b.group)),
    );
})();

export const allArticles = (): BlogArticle[] => ARTICLES;

export const articleBySlug = (slug: string): BlogArticle | null =>
  ARTICLES.find((a) => a.slug === slug) ?? null;

export const allCategories = (): BlogCategoryListItem[] => CATEGORIES;

export const articlesByCategory = (categorySlug: string): BlogArticle[] =>
  ARTICLES.filter((a) => a.category.slug === categorySlug);

export const articlesByGroup = (group: string): BlogArticle[] =>
  ARTICLES.filter((a) => a.category.group === group);

export const categoryGroups = (): BlogCategoryGroup[] => GROUPS;

export const relatedArticles = (
  slug: string,
  limit = 3,
): BlogArticle[] => {
  const current = articleBySlug(slug);
  if (!current) return [];
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.category.slug === current.category.slug,
  ).slice(0, limit);
};
