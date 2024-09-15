"use client";
import { useState, useEffect } from "react";
import Post from "./post/post";
import { ActionIcon, Input, Menu, Pagination } from "@mantine/core";
import { FiltreArticle, useBlogStore } from "@/src/store/blogStore";
import {
  BlogCategoriesProps,
  BlogSubCategoriesProps,
} from "@/src/lib/services/blog/BlogCategory";

import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { CategoriesFilter } from "../../_UI/Filters/Filters";
export interface PostsProps {
  subCategories?: BlogSubCategoriesProps[];
  categories?: BlogCategoriesProps[];
}

const Posts: React.FC<PostsProps> = ({ subCategories, categories }) => {
  const filteredArticles = useBlogStore((state) => state.filteredArticles);
  const initializeArticles = useBlogStore((state) => state.initializeArticles);
  const [currentPage, setCurrentPage] = useState(1);

  const filteringArticles = useBlogStore((state) => state.filteringArticles);
  const searchingArticles = useBlogStore((state) => state.searchingArticles);
  const articlesPerPage = 9;

  useEffect(() => {
    initializeArticles();
  }, [initializeArticles]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles?.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <CategoriesFilter
        filteredArticles={filteredArticles}
        categories={categories}
        subCategories={subCategories}
      />
      <div className="flex w-full items-center gap-5 px-4 md:mx-0">
        <Input
          size="sm"
          className="w-full"
          placeholder="Rechercher un article/catégorie..."
          radius={"md"}
          leftSection={<CgSearch size={16} />}
          onChange={({ target }) => searchingArticles(target.value)}
        />
        <Menu zIndex={1} position="bottom" shadow="md">
          <Menu.Target>
            <ActionIcon
              size={"lg"}
              radius={"md"}
              color="#23410C"
              variant="outline"
            >
              <IoFilter
                color="#23410C"
                className="cursor-pointer"
                size={"70%"}
              />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Trier</Menu.Label>
            <Menu.Item
              onClick={() => filteringArticles(FiltreArticle.DateCroissant)}
              leftSection={<CiCalendarDate size={14} />}
            >
              Date croissant
            </Menu.Item>
            <Menu.Item
              onClick={() => filteringArticles(FiltreArticle.DateDecroissant)}
              leftSection={<CiCalendarDate size={14} />}
            >
              Date décroissant
            </Menu.Item>
            <Menu.Item
              onClick={() => filteringArticles(FiltreArticle.TitreCroissant)}
              leftSection={<BsSortAlphaDown size={14} />}
            >
              Alphabétique croissant
            </Menu.Item>
            <Menu.Item
              onClick={() => filteringArticles(FiltreArticle.DateDecroissant)}
              leftSection={<BsSortAlphaDownAlt size={14} />}
            >
              Alphabet décroissant
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="mx-4 mt-12 flex flex-col items-center gap-12 md:mx-0">
        <div className="flex w-full justify-between">
          <div className="grid justify-items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
            {currentArticles?.map((article) => (
              <Post
                key={article.id}
                article={article}
                subCategories={subCategories}
              />
            ))}
          </div>
        </div>
        {Math.ceil(filteredArticles?.length / articlesPerPage) > 1 && (
          <Pagination
            size={"lg"}
            color="#caea7a"
            total={Math.ceil(filteredArticles?.length / articlesPerPage)}
            siblings={1}
            defaultValue={1}
            onChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default Posts;
