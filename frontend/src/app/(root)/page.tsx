import React from "react";
import Teams from "@/src/components/_Root/home/teams/Teams";
import { getMembersUsers } from "@/src/lib/services/users/Users";
import Banner from "@/src/components/_Root/home/banner/Banner";
import Info from "@/src/components/_Root/home/info/Info";
import Hero from "@/src/components/_Root/home/hero/Hero";
import Blog from "@/src/components/_Root/home/blog/Blog";
import { getPageSeo } from "@/src/lib/services/page/Page";

export async function generateMetadata() {
  const page = await getPageSeo("home");
  return {
    title: page.seo.meta_title,
    description: page.seo.meta_description,
  };
}

const Home: React.FC = async () => {
  const users = await getMembersUsers("");
  return (
    <div className="relative flex flex-col gap-20">
      <Hero />
      <Info />
      <Teams users={users} />
      <Blog />
      <Banner />
    </div>
  );
};

export default Home;
