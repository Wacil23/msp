import Hero from "@/src/components/_Root/hero/hero";
import Posts from "@/src/components/_Root/posts/posts";
import {
  BlogCategoriesProps,
  BlogSubCategoriesProps,
  useGetAllCategoriesBlog,
  useGetAllSubCategoriesBlog,
} from "@/src/lib/services/blog/BlogCategory";
import React from "react";

const Blog: React.FC = async () => {
  const categories: BlogCategoriesProps[] = await useGetAllCategoriesBlog();
  const subCategories: BlogSubCategoriesProps[] =
    await useGetAllSubCategoriesBlog();

  return (
    <>
      <div className="flex flex-col gap-8 py-16">
        <Hero
          title="Notre blog"
          subtitle={
            <>
              Actus et Santé <br /> Tout savoir sur la santé
            </>
          }
        />
      </div>
      <div className="flex flex-col gap-8 py-16 lg:mx-52">
        <Posts categories={categories} subCategories={subCategories} />
      </div>
    </>
  );
};

export default Blog;
