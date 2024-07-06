"use client";
import React from "react";
import Post from "./post/post";
import { ActionIcon, Input, Menu, Pagination } from "@mantine/core";
import { FiltreArticle, useBlogStore } from "@/src/store/blogStore";
import {
  BlogCategoriesProps,
  BlogSubCategoriesProps,
} from "@/src/lib/services/blog/BlogCategory";
import classes from "../../../config/theme/theme.module.css";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
interface PostsProps {
  subCategories: BlogSubCategoriesProps[];
  categories: BlogCategoriesProps[];
}

const Posts: React.FC<PostsProps> = ({ subCategories, categories }) => {
  const filteredArticles = useBlogStore((state) => state.filteredArticles);
  const initializeArticles = useBlogStore((state) => state.initializeArticles);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isSubCategories, setIsSubCategories] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const setActiveCategory = useBlogStore((state) => state.setActiveCategory);
  const activeCategory = useBlogStore((state) => state.activeCategory);
  const filteringArticles = useBlogStore((state) => state.filteringArticles);
  const searchingArticles = useBlogStore((state) => state.searchingArticles);
  const articlesPerPage = 9;

  React.useEffect(() => {
    initializeArticles();
  }, [initializeArticles]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsSubCategories(true);
  };
  const handleBackClick = () => {
    setIsSubCategories(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-full bg-[#fafafa] py-7">
        <div
          className={`absolute top-1/2 flex w-full items-center justify-evenly ${isSubCategories ? classes.categoryTranslateUp : "-translate-y-1/2 opacity-100 transition-all duration-300"}`}
        >
          <p
            tabIndex={1}
            className={`cursor-pointer ${activeCategory === "all" ? "underline-darker font-semibold text-darker underline underline-offset-2" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            Tout
          </p>
          {categories
            .filter((cat) => cat.title !== "Autres")
            .map((category) => (
              <p
                tabIndex={1}
                className={`flex cursor-pointer items-center gap-2 ${
                  activeCategory === category.title
                    ? "font-semibold text-darker"
                    : ""
                }`}
                key={category.id}
                onClick={() => handleCategoryClick(category.title)}
              >
                {category.title}
                <IoIosArrowDown />
              </p>
            ))}
          <p
            tabIndex={1}
            onClick={() => setActiveCategory("autres")}
            className={`cursor-pointer ${activeCategory === "autres" ? "underline-darker font-semibold text-darker underline underline-offset-2" : ""}`}
          >
            Autres
          </p>
        </div>
        <div
          className={`absolute top-1/2 flex w-full items-center justify-evenly ${isSubCategories ? classes.subcategoryTranslateUp : "translate-y-[4rem] opacity-0"}`}
        >
          <IoIosArrowBack
            className="cursor-pointer"
            onClick={() => handleBackClick()}
          >
            Retour
          </IoIosArrowBack>
          {subCategories
            .filter(
              (subCategory) =>
                subCategory.parent_category.title === selectedCategory,
            )
            .map((subCategory) => (
              <p
                className={`cursor-pointer ${activeCategory === subCategory.title ? "underline-darker font-semibold text-darker underline underline-offset-2" : ""}`}
                key={subCategory.id}
                onClick={() => setActiveCategory(subCategory.title)}
              >
                {subCategory.title}
              </p>
            ))}
        </div>
      </div>
      <div className="flex w-full items-center gap-5">
        <Input
          size="md"
          className="w-full"
          placeholder="Rechercher un article/catégorie..."
          radius={"lg"}
          leftSection={<CgSearch size={16} />}
          onChange={({ target }) => searchingArticles(target.value)}
        />
        <Menu position="bottom" shadow="md">
          <Menu.Target>
            <ActionIcon
              size={"lg"}
              radius={"lg"}
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
      <div className="mt-12 flex flex-col items-center gap-12">
        <div className="flex w-full justify-between">
          <div className="grid justify-items-stretch gap-8 lg:grid-cols-3">
            {currentArticles?.map((article) => (
              <Post
                key={article.id}
                article={article}
                subCategories={subCategories}
              />
            ))}
          </div>
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
    </>
  );
};

export default Posts;
