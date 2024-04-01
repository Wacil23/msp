import { readItems } from "@directus/sdk";
import { directus } from "../../directus";
import { useQuery } from "react-query";

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
  const apiResponse = await api.request<BlogCategoriesProps[]>(
    readItems("category_blog", {
      fields: ["title, id"],
    })
  );
  return apiResponse;
};

export const useGetAllSubCategoriesBlog = async () => {
  const api = directus();
  const apiResponse = await api.request<BlogSubCategoriesProps[]>(
    readItems("sub_category", {
      fields: ["title, id, parent_category.id, parent_category.title"],
    })
  );
  return apiResponse;
};
