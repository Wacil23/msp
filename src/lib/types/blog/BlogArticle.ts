export interface BlogCategoryListItem {
  slug: string;
  name: string;
  group: string;
}

export interface BlogCategoryGroup {
  group: string;
  categories: BlogCategoryListItem[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  date: string | null;
  excerpt: string;
  cover: string | null;
  contentHtml: string;
  category: BlogCategoryListItem;
  sourceUrl?: string;
}
