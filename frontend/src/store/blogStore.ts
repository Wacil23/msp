import { create } from "zustand";
import {
  useGetAllArticlesBlog,
  useGetOneArticleBlog,
} from "../lib/services/blog/BlogArticle";
import { type BlogArticle } from "../lib/types/blog/BlogArticle";

export enum FiltreArticle {
  DateCroissant,
  DateDecroissant,
  TitreCroissant,
  TitreDecroissant,
}
interface BlogStore {
  articles: BlogArticle[];
  article: BlogArticle | null;
  activeCategory: string;
  filteredArticles: BlogArticle[];
  lastArticles: BlogArticle[];
  setActiveCategory: (category: string) => void;
  showSubCategories: (parentCategoryId: string) => void;
  initializeArticles: (size?: number) => Promise<void>;
  getArticleById: (articleId: string) => void;
  filteringArticles: (filtre: FiltreArticle) => void;
  searchingArticles: (query: string) => void;
}

export const useBlogStore = create<BlogStore>()((set) => ({
  articles: [],
  activeCategory: "all",
  filteredArticles: [],
  lastArticles: [],
  article: null,
  setActiveCategory: (category) =>
    set((state) => {
      const filteredArticles = state.articles.filter(
        (article) =>
          category === "all" ||
          article.category?.title === category ||
          (!article.category?.title && category === "autres"),
      );
      return { activeCategory: category, filteredArticles };
    }),
  showSubCategories: (parentCategoryId) =>
    set(() => {
      return { activeCategory: parentCategoryId };
    }),
  initializeArticles: async (size?: number) => {
    const articles = await useGetAllArticlesBlog();
    set({
      articles,
      filteredArticles: articles,
      lastArticles: articles.slice(0, size ?? 5),
    });
  },
  getArticleById: async (articleId: string) => {
    const article = await useGetOneArticleBlog(articleId);
    set({
      article: article,
    });
  },
  filteringArticles: (filtre: FiltreArticle) => {
    set((state) => {
      let sortedArticles = [...state.filteredArticles];
      switch (filtre) {
        case FiltreArticle.DateCroissant:
          sortedArticles.sort(
            (a, b) =>
              new Date(a.date_created).getTime() -
              new Date(b.date_created).getTime(),
          );
          break;
        case FiltreArticle.DateDecroissant:
          sortedArticles.sort(
            (a, b) =>
              new Date(b.date_created).getTime() -
              new Date(a.date_created).getTime(),
          );
          break;
        case FiltreArticle.TitreCroissant:
          sortedArticles.sort((a, b) =>
            a.title.split("")[0].localeCompare(b.title),
          );
          break;
        case FiltreArticle.TitreDecroissant:
          sortedArticles.sort((a, b) =>
            b.title.split("")[0].localeCompare(a.title),
          );
          break;
        default:
          break;
      }
      return { filteredArticles: sortedArticles };
    });
  },
  searchingArticles: (query: string) => {
    set((state) => {
      if (!query) {
        const filteredArticles = state.articles.filter(
          (article) =>
            state.activeCategory === "all" ||
            article.category.title === state.activeCategory ||
            (article.category.parent_category &&
              article.category.parent_category.title === state.activeCategory),
        );
        return { filteredArticles };
      }
      const filteredArticles = state.filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.category.title.toLowerCase().includes(query.toLowerCase()) ||
          (article.category.parent_category &&
            article.category.parent_category.title
              .toLowerCase()
              .includes(query.toLowerCase())),
      );
      return { filteredArticles };
    });
  },
}));
