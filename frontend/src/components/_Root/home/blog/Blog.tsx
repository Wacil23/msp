"use client";
import { useBlogStore } from "@/src/store/blogStore";
import formatDate from "@/src/utils/func/GetLocalDate";
import { Badge } from "@mantine/core";
import Image from "next/image";
import React from "react";
const Blog = () => {
  const lastArticles = useBlogStore((state) => state.lastArticles);
  const initializeArticles = useBlogStore((state) => state.initializeArticles);
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS!;
  React.useEffect(() => {
    initializeArticles(8);
  }, [initializeArticles]);

  return (
    <div className="flex flex-col gap-24 md:px-24 md:py-32">
      <h2 className="text-4xl font-semibold text-darker">
        Nos derniers articles
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {lastArticles.slice(0, 2).map((article) => (
          <div
            style={{
              backgroundImage: `url(${
                directusUrl + article.image.filename_disk
              })`,
            }}
            className="group/blog relative h-96 cursor-pointer rounded-2xl bg-[#DCF1A7] bg-cover bg-center bg-no-repeat p-5 shadow-md hover:shadow-xl md:col-span-4 md:row-span-3 lg:col-span-2"
            key={article.id}
          >
            <div className="relative z-10 flex h-full flex-col place-content-between">
              <h3 className="text-2xl font-semibold text-white">
                {article.title}
              </h3>
              <div className="flex gap-2">
                <Badge color="light.1">
                  <p className="text-darker">
                    {article.category.parent_category.title}
                  </p>
                </Badge>
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
        {lastArticles.slice(3, 5).map((article) => {
          return (
            <div
              style={{
                backgroundImage: `url(${
                  directusUrl + article.image.filename_disk
                })`,
              }}
              className="group/blog relative h-96 cursor-pointer rounded-2xl bg-[#d3ed91] bg-cover bg-center bg-no-repeat p-5 shadow-md hover:shadow-xl md:col-span-1"
              key={article.id}
            >
              <div className="relative z-10 flex h-full flex-col place-content-between">
                <h3 className="text-2xl font-semibold text-white">
                  {article.title}
                </h3>
                <div className="flex gap-2">
                  <Badge color="light.1">
                    <p className="text-darker">
                      {article.category.parent_category.title}
                    </p>
                  </Badge>
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
        {lastArticles.slice(5, 7).map((article) => (
          <div
            style={{
              backgroundImage: `url(${
                directusUrl + article.image.filename_disk
              })`,
            }}
            className="group/blog relative rounded-2xl bg-cover bg-center bg-no-repeat p-5 shadow-md md:col-span-1 md:row-span-1"
            key={article.id}
          >
            <div className="relative z-10 flex h-full flex-col place-content-between">
              <h3 className="text-2xl font-semibold text-white">
                {article.title}
              </h3>
              <div className="flex gap-2">
                <Badge color="light.1">
                  <p className="text-darker">
                    {article.category.parent_category.title}
                  </p>
                </Badge>
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
    </div>
  );
};

export default Blog;
