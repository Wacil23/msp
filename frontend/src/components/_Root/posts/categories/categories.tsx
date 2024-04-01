"use client";
import {
  BlogCategoriesProps,
  BlogSubCategoriesProps,
} from "@/src/lib/services/blog/BlogCategory";
import { useBlogStore } from "@/src/store/blogStore";
import React, { useEffect } from "react";

export type CategoriesProps = {
  categories: BlogCategoriesProps[];
  subCategories: BlogSubCategoriesProps[];
};

const Categories: React.FC<CategoriesProps> = ({
  categories,
  subCategories,
}) => {
  const activeCategory = useBlogStore((state) => state.activeCategory);
  const setActiveCategory = useBlogStore((state) => state.setActiveCategory);
  const showSubCategories = useBlogStore((state) => state.showSubCategories);
  const activeSubCategories = subCategories.filter(
    (subCategory) => subCategory.parent_category.id === activeCategory
  );

  console.log("categories", categories);

  return (
    <div className="w-full">
      <ul className="flex justify-between lg:px-12 bg-darker rounded-b-lg rounded-br-lg gap-7 overflow-x-auto py-8">
        <li
          onClick={() => setActiveCategory("all")}
          className={`text-white px-4 rounded-lg cursor-pointer py-2 hover:bg-darkLight/45 border border-transparent hover:border hover:border-darkStroke/50 ${
            activeCategory === "all" ? "bg-darkLight border-darkStroke" : ""
          }`}
        >
          Tout
        </li>
        {activeSubCategories.length > 0 ? (
          activeSubCategories.map((subCategory) => (
            <li
              key={subCategory.id}
              onClick={() => setActiveCategory(subCategory.title)}
              className={`text-white px-4 rounded-lg cursor-pointer py-2 hover:bg-darkLight/45 border border-transparent hover:border hover:border-darkStroke/50 ${
                activeCategory === subCategory.title
                  ? "bg-darkLight border-darkStroke"
                  : ""
              }`}
            >
              {subCategory.title}
            </li>
          ))
        ) : (
          <>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.title);
                  showSubCategories(category.id);
                }}
                className={`text-white px-4 rounded-lg cursor-pointer py-2 hover:bg-darkLight/45 border border-transparent hover:border hover:border-darkStroke/50 ${
                  activeCategory === category.title
                    ? "bg-darkLight border-darkStroke"
                    : ""
                }`}
              >
                {category.title}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Categories;
