import Hero from "@/src/components/_Root/hero/hero";
import BlogIndex from "@/src/components/_Root/posts/BlogIndex";
import {
  getAllArticlesBlog,
  getCategoryGroupsBlog,
} from "@/src/lib/services/blog/BlogArticle";
import { getPageSeo } from "@/src/lib/services/page/Page";

export const dynamic = "force-static";

export async function generateMetadata() {
  const page = await getPageSeo("blog");
  return {
    title: page.seo.meta_title,
    description: page.seo.meta_description,
  };
}

const BlogPage = async () => {
  const [articles, groups] = await Promise.all([
    getAllArticlesBlog(),
    getCategoryGroupsBlog(),
  ]);

  return (
    <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-14">
      <Hero
        eyebrow="Conseils santé"
        title={
          <>
            Conseils santé.
            <br className="hidden md:block" />
            <span className="text-secondary"> {articles.length} fiches.</span>
          </>
        }
        description="Maladies, prévention, suivi, hygiène de vie. Un index pratique pour s'informer."
      />
      <BlogIndex articles={articles} groups={groups} />
    </div>
  );
};

export default BlogPage;
