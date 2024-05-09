import { readItems, withToken } from "@directus/sdk";
import { directus } from "../../directus";

export type BlogArticle = {
  title: string;
  category: {
    id: string;
    title: string;
    parent_category: {
      id: string;
      title: string;
    };
  };
  image: {
    filename_disk: string;
  };
  small_description: string;
  id: string;
};

export const useGetAllArticlesBlog = async () => {
  const api = directus();
  const apiResponse = await api.request<BlogArticle[]>(
    readItems("blog", {
      fields: [
        "title, id, small_description",
        "category.title",
        "category.id",
        "category.parent_category.id",
        "category.parent_category.title",
        "image.filename_disk",
      ],
    })
  );

  return apiResponse;
};
