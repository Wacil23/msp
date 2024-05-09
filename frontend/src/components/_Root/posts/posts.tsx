"use client";
import React from "react";
import Post from "./post/post";
import { Button, Pagination, TextInput } from "@mantine/core";
import { useBlogStore } from "@/src/store/blogStore";
import { BlogSubCategoriesProps } from "@/src/lib/services/blog/BlogCategory";
import { useSession } from "next-auth/react";

interface PostsProps {
  subCategories: BlogSubCategoriesProps[];
}

const Posts: React.FC<PostsProps> = ({ subCategories }) => {
  const filteredArticles = useBlogStore((state) => state.filteredArticles);
  const initializeArticles = useBlogStore((state) => state.initializeArticles);
  const [currentPage, setCurrentPage] = React.useState(1);
  const articlesPerPage = 6;
  const token = useSession();
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
    <div className="flex flex-col gap-12 mt-12 items-center">
      <div className="flex w-full justify-between px-24">
        <div className="grid lg:grid-cols-2 gap-y-8 w-[70%] justify-items-stretch ">
          {currentArticles?.map((article) => (
            <Post
              key={article.id}
              article={article}
              subCategories={subCategories}
            />
          ))}
        </div>
        <aside className="flex flex-col gap-2 w-2/6 bg-primary p-6 rounded-md">
          <div className="flex items-end">
            <TextInput
              className="w-[70%]"
              label="Rejoignez notre newsletter"
              type="text"
            />
            <Button w={"30%"}>S'abonner</Button>
          </div>
          <nav>
            <p>Retrouvez nous sur</p>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>X</li>
            </ul>
          </nav>
        </aside>
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
