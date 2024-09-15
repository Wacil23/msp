import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/src/components/_Root/hero/hero"), {
  ssr: false,
});
const Posts = dynamic(() => import("@/src/components/_Root/posts/posts"), {
  ssr: false,
});
import {
  useGetAllCategoriesBlog,
  useGetAllSubCategoriesBlog,
} from "@/src/lib/services/blog/BlogCategory";

const Blog: React.FC = async () => {
  const categories = await useGetAllCategoriesBlog();
  const subCategories = await useGetAllSubCategoriesBlog();

  return (
    <>
      <div className="flex flex-col gap-8 py-12 md:py-16">
        <Hero
          title="Notre blog"
          subtitle={
            <>
              Actus et Santé <br /> Tout savoir sur la santé
            </>
          }
        />
      </div>
      <div className="flex flex-col gap-8 py-16 md:mx-20 lg:mx-32 xl:mx-52">
        <Posts categories={categories} subCategories={subCategories} />
      </div>
    </>
  );
};

export default Blog;
