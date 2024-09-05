import { readItems } from "@directus/sdk";
import { directus } from "../../directus";

export type BlogCategoriesProps = {
  title: string;
  id: string;
};
export type BlogSubCategoriesProps = {
  title: string;
  id: string;
  parent_category: {
    id: string;
    title: string;
  };
};

export const useGetAllCategoriesBlog = async () => {
  const api = directus();
  try {
    const apiResponse = await api.request<BlogCategoriesProps[]>(
      readItems<any, any, any>("category_blog", {
        fields: ["title, id"],
      }),
    );
    return apiResponse;
  } catch (e) {}
};

export const useGetAllSubCategoriesBlog = async () => {
  const api = directus();
  try {
    const apiResponse = await api.request<BlogSubCategoriesProps[]>(
      readItems<any, any, any>("sub_category", {
        fields: ["title, id, parent_category.id, parent_category.title"],
      }),
    );
    return apiResponse;
  } catch (e) {}
};
