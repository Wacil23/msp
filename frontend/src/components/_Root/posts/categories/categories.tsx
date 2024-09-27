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
    (subCategory) => subCategory.parent_category.id === activeCategory,
  );

  return (
    <div className="w-full">
      <ul className="flex justify-between gap-7 overflow-x-auto rounded-b-lg rounded-br-lg bg-darker py-8 lg:px-12">
        <li
          onClick={() => setActiveCategory("all")}
          className={`hover:bg-darkLight/45 hover:border-darkStroke/50 cursor-pointer rounded-lg border border-transparent px-4 py-2 text-white hover:border ${
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
              className={`hover:bg-darkLight/45 hover:border-darkStroke/50 cursor-pointer rounded-lg border border-transparent px-4 py-2 text-white hover:border ${
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
                className={`hover:bg-darkLight/45 hover:border-darkStroke/50 cursor-pointer rounded-lg border border-transparent px-4 py-2 text-white hover:border ${
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
