import React from "react";

import Banner from "@/src/components/_Root/home/banner/Banner";
import Hero from "@/src/components/_Root/home/hero/Hero";
import Info from "@/src/components/_Root/home/info/Info";
import Teams from "@/src/components/_Root/home/teams/Teams";
import Blog from "@/src/components/_Root/home/blog/Blog";
import { getAllArticlesBlog } from "@/src/lib/services/blog/BlogArticle";
import { getPageSeo } from "@/src/lib/services/page/Page";

export async function generateMetadata() {
  const page = await getPageSeo("home");
  return {
    title: page.seo.meta_title,
    description: page.seo.meta_description,
  };
}

const Home = async () => {
  const articles = await getAllArticlesBlog();
  const featured = articles.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 py-10 md:gap-24 md:py-14 lg:gap-28">
      <Hero />
      <Info />
      <Teams />
      <Blog articles={featured} />
      <Banner />
    </div>
  );
};

export default Home;
