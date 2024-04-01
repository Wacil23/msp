"use client";
import React from "react";
import Post from "./post/post";
import { Pagination } from "@mantine/core";
import { useBlogStore } from "@/src/store/blogStore";

const Posts: React.FC = () => {
  const filteredArticles = useBlogStore((state) => state.filteredArticles);
  const initializeArticles = useBlogStore((state) => state.initializeArticles);
  const [currentPage, setCurrentPage] = React.useState(1);
  const articlesPerPage = 6;

  React.useEffect(() => {
    initializeArticles();
  }, [initializeArticles]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-12 items-center ">
      <div className="grid lg:grid-cols-2 gap-3 justify-items-stretch ">
        {currentArticles?.map((article) => (
          <Post
            article={article}
            className="p-8 rounded-md border border-stroke bg-lightGreen"
          />
        ))}
      </div>
      {Math.ceil(filteredArticles.length / articlesPerPage) > 1 && (
        <Pagination
          size={"lg"}
          color="#caea7a"
          total={Math.ceil(filteredArticles.length / articlesPerPage)}
          siblings={1}
          defaultValue={1}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Posts;
