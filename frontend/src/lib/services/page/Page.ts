import { readItems } from "@directus/sdk";
import { directus } from "../../directus";

type PageSeo = {
  seo: {
    meta_title: string;
    meta_description: string;
  };
};

export const getPageSeo = async (slug: string): Promise<PageSeo> => {
  const api = directus();
  const pageSeo = await api.request<PageSeo[]>(
    readItems<any, any, any>("page", {
      filter: {
        slug: slug,
      },
      fields: ["seo.*"],
    }),
  );
  return pageSeo[0];
};
