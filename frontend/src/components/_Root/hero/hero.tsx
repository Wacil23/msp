import {
  BlogCategoriesProps,
  BlogSubCategoriesProps,
  useGetAllCategoriesBlog,
  useGetAllSubCategoriesBlog,
} from "@/src/lib/services/blog/BlogCategory";
import { ThemeIcon } from "@mantine/core";
import React from "react";
import { GrArticle } from "react-icons/gr";
import Categories from "../posts/categories/categories";

async function Hero() {
  const categories: BlogCategoriesProps[] = await useGetAllCategoriesBlog();
  const subCategories: BlogSubCategoriesProps[] =
    await useGetAllSubCategoriesBlog();

  return (
    <div>
      <div className="border-t md:min-h-96 md:max-h-96 border-l border-r flex flex-col items-center  bg-lightGreen border-stroke rounded-t-lg rounded-tl-lg">
        <div className="flex py-[3.75rem]  px-7 flex-col gap-8 items-center">
          <ThemeIcon size="xl" variant="light" color="lime.5">
            <GrArticle style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
          <div className="flex flex-col gap-5 items-center mt-10">
            <h1 className="text-4xl text-darker font-bold">Notre Blog</h1>
            <p className="text-sm text-darker font-semibold text-pretty text-center">
              Dans la section blog de la MSP, vous trouverez des articles de
              différentes catégories afin de répondre aux questions les plus
              fréquentes et vous fournir des informations de premier plan sur
              une vaste gamme de sujets liés à la santé et au bien-être. Que
              vous cherchiez des conseils pratiques pour maintenir une vie
              saine, des informations sur les dernières avancées médicales, ou
              des astuces pour gérer votre bien-être mental, notre blog est
              conçu pour être votre ressource incontournable.
            </p>
          </div>
        </div>
      </div>
      <Categories subCategories={subCategories} categories={categories} />
    </div>
  );
}

export default Hero;
