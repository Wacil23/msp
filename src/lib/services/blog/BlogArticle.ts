import {
  allArticles,
  articleBySlug,
  allCategories,
  articlesByCategory,
  articlesByGroup,
  categoryGroups,
  relatedArticles,
} from "@/src/lib/data/blog";
import type {
  BlogArticle,
  BlogCategoryGroup,
  BlogCategoryListItem,
} from "@/src/lib/types/blog/BlogArticle";

export const getAllArticlesBlog = async (): Promise<BlogArticle[]> =>
  allArticles();

export const getOneArticleBlog = async (
  slug: string,
): Promise<BlogArticle | null> => articleBySlug(slug);

export const getAllCategoriesBlog = async (): Promise<
  BlogCategoryListItem[]
> => allCategories();

export const getCategoryGroupsBlog = async (): Promise<BlogCategoryGroup[]> =>
  categoryGroups();

export const getArticlesByCategory = async (
  categorySlug: string,
): Promise<BlogArticle[]> => articlesByCategory(categorySlug);

export const getArticlesByGroup = async (
  group: string,
): Promise<BlogArticle[]> => articlesByGroup(group);

export const getRelatedArticles = async (
  slug: string,
  limit = 3,
): Promise<BlogArticle[]> => relatedArticles(slug, limit);
