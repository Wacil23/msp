import { BlogArticle } from "@/src/lib/types/blog/BlogArticle";
import dynamic from "next/dynamic";

const BlogArticles = dynamic(() => import("./BlogArticles"), {
  ssr: false,
});

interface BlogProps {
  articles?: BlogArticle[];
}

const Blog: React.FC<BlogProps> = ({ articles }) => {
  return (
    <div className="mx-4 flex flex-col gap-12 px-4 pb-10 md:py-32 xl:gap-24">
      <h2 className="text-2xl font-normal text-darker lg:text-4xl">
        Nos derniers articles
      </h2>
      <BlogArticles articles={articles} />
    </div>
  );
};

export default Blog;
