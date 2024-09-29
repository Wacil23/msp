"use client";
import { Badge } from "@mantine/core";
import formatDate from "@/src/utils/func/GetLocalDate";
import { BlogArticle } from "@/src/lib/types/blog/BlogArticle";

interface BlogArticleProps {
  articles?: BlogArticle[];
}

const BlogArticles: React.FC<BlogArticleProps> = ({ articles }) => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS!;

  const redirectToBlog = (id: string) => {
    window.location.href = `/blog/${id}`;
  };
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {articles?.slice(0, 2).map((article) => (
        <div
          style={{
            backgroundImage: `url(${
              directusUrl + article.image.filename_disk
            })`,
          }}
          onClick={() => redirectToBlog(article.id)}
          tabIndex={0}
          className="group/blog relative h-96 cursor-pointer rounded-2xl bg-[#DCF1A7] bg-cover bg-center bg-no-repeat p-5 shadow-md hover:shadow-xl md:col-span-4 md:row-span-3 lg:col-span-2"
          key={article.id}
        >
          <div className="relative z-10 flex h-full flex-col place-content-between">
            <h3 className="text-2xl font-semibold text-white">
              {article.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.category.parent_category && (
                <Badge color="light.1">
                  <p className="text-darker">
                    {article.category?.parent_category?.title}
                  </p>
                </Badge>
              )}
              <Badge color="light.1">
                <p className="text-darker">{article.read_time} min</p>
              </Badge>
              <Badge color="light.1">
                <p className="text-darker">
                  {formatDate(article.date_created)}
                </p>
              </Badge>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gray-950 opacity-30 transition-opacity group-hover/blog:opacity-70"></div>
        </div>
      ))}
      {articles?.slice(2, 5).map((article) => {
        return (
          <div
            style={{
              backgroundImage: `url(${
                directusUrl + article.image.filename_disk
              })`,
            }}
            onClick={() => redirectToBlog(article.id)}
            tabIndex={0}
            className="group/blog relative h-96 cursor-pointer rounded-2xl bg-[#d3ed91] bg-cover bg-center bg-no-repeat p-5 shadow-md hover:shadow-xl md:col-span-2 xl:col-span-1"
            key={article.id}
          >
            <div className="relative z-10 flex h-full flex-col place-content-between">
              <h3 className="text-2xl font-semibold text-white">
                {article.title}
              </h3>
              <div className="flex gap-2">
                {article.category.parent_category && (
                  <Badge color="light.1">
                    <p className="text-darker">
                      {article.category.parent_category.title}
                    </p>
                  </Badge>
                )}
                <Badge color="light.1">
                  <p className="text-darker">{article.read_time} min</p>
                </Badge>
                <Badge color="light.1">
                  <p className="text-darker">
                    {formatDate(article.date_created)}
                  </p>
                </Badge>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gray-950 opacity-30 transition-opacity group-hover/blog:opacity-70"></div>
          </div>
        );
      })}
      {articles?.slice(5, 12).map((article) => (
        <div
          style={{
            backgroundImage: `url(${
              directusUrl + article.image.filename_disk
            })`,
          }}
          onClick={() => redirectToBlog(article.id)}
          tabIndex={0}
          className="group/blog relative h-96 cursor-pointer rounded-2xl bg-[#d3ed91] bg-cover bg-center bg-no-repeat p-5 shadow-md hover:shadow-xl md:col-span-2 xl:col-span-1"
          key={article.id}
        >
          <div className="relative z-10 flex h-full flex-col place-content-between">
            <h3 className="text-2xl font-semibold text-white">
              {article.title}
            </h3>
            <div className="flex gap-2">
              {article.category.parent_category && (
                <Badge color="light.1">
                  <p className="text-darker">
                    {article.category.parent_category.title}
                  </p>
                </Badge>
              )}
              <Badge color="light.1">
                <p className="text-darker">{article.read_time} min</p>
              </Badge>
              <Badge color="light.1">
                <p className="text-darker">
                  {formatDate(article.date_created)}
                </p>
              </Badge>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gray-950 opacity-30 transition-opacity group-hover/blog:opacity-70"></div>
        </div>
      ))}
    </div>
  );
};

export default BlogArticles;
