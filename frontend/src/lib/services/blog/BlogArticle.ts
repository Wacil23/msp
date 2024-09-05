import { readItems, readItem } from "@directus/sdk";
import { directus } from "../../directus";
import { type BlogArticle } from "../../types/blog/BlogArticle";

export const useGetAllArticlesBlog = async () => {
  const api = directus();
  try {
    const apiResponse = await api.request<BlogArticle[]>(
      readItems<any, any, any>("blog", {
        fields: [
          "date_created",
          "read_time",
          "title",
          "id",
          "small_description",
          "category.title",
          "category.id",
          "category.parent_category.id",
          "category.parent_category.title",
          "image.filename_disk",
        ],
        sort: "-date_created",
      }),
    );
    return apiResponse;
  } catch (e) {
    console.error("An error occurs : ", e);
  }
};

export const useGetOneArticleBlog = async (id: string) => {
  const api = directus();
  try {
    const apiResponse = await api.request<BlogArticle>(
      readItem<any, any, any>("blog", id, {
        fields: [
          "date_created",
          "read_time",
          "title, id, small_description",
          "category.title",
          "category.id",
          "category.parent_category.id",
          "category.parent_category.title",
          "image.filename_disk",
          "content",
        ],
      }),
    );

    return apiResponse;
  } catch (e) {
    console.error("An error occurs : ", e);
  }
};
