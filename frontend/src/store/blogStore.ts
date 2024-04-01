import { create } from "zustand";
import {
  BlogArticle,
  useGetAllArticlesBlog,
} from "../lib/services/blog/BlogArticle";

interface BlogStore {
  articles: BlogArticle[];
  activeCategory: string;
  filteredArticles: BlogArticle[];
  setActiveCategory: (category: string) => void;
  showSubCategories: (parentCategoryId: string) => void;
  initializeArticles: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>()((set) => ({
  articles: [],
  activeCategory: "all",
  filteredArticles: [],
  setActiveCategory: (category) =>
    set((state) => {
      const filteredArticles = state.articles.filter(
        (article) =>
          category === "all" ||
          article.category?.parent_category?.title === category
      );
      return { activeCategory: category, filteredArticles };
    }),
  showSubCategories: (parentCategoryId) =>
    set((state) => {
      return { activeCategory: parentCategoryId };
    }),
  initializeArticles: async () => {
    const articles = await useGetAllArticlesBlog();
    set({ articles, filteredArticles: articles });
  },
}));
