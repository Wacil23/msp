import type {
  BlogArticle,
  BlogCategoryGroup,
  BlogCategoryListItem,
} from "@/src/lib/types/blog/BlogArticle";

import generated from "./blog.generated.json";

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

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

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
  const excerpt =
    raw.summary && raw.summary.trim()
      ? raw.summary.trim()
      : buildExcerpt(raw.contentHtml);
  return {
    slug: raw.slug || raw.sourceSlug,
    title: raw.title,
    date: raw.date,
    cover: raw.cover,
    contentHtml: raw.contentHtml,
    excerpt,
    sourceUrl: raw.sourceUrl,
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
