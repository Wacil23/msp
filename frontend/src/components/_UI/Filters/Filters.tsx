import React from "react";
import { useBlogStore } from "@/src/store/blogStore";
import { PostsProps } from "../../_Root/posts/posts";
import { useWindowSize } from "@/src/lib/hooks/window/useWindowSize";
import FilterDesktop from "./Desktop/FilterDesktop";
import FilterMobile from "./Mobile/FilterMobile";
import { BlogArticle } from "@/src/lib/types/blog/BlogArticle";

export interface CategoriesFilterProps extends PostsProps {
  filteredArticles: BlogArticle[];
}

/* Category filter */
export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
  subCategories,
  filteredArticles,
}) => {
  const setActiveCategory = useBlogStore((state) => state.setActiveCategory);
  const activeCategory = useBlogStore((state) => state.activeCategory);
  const [isSubCategories, setIsSubCategories] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsSubCategories(true);
  };
  const handleBackClick = () => {
    setIsSubCategories(false);
    setSelectedCategory(null);
  };
  const isTablet = useWindowSize().width <= 1024;
  return (
    <>
      {isTablet ? (
        <FilterMobile
          activeCategory={activeCategory}
          handleBackClick={handleBackClick}
          handleCategoryClick={handleCategoryClick}
          isSubCategories={isSubCategories}
          selectedCategory={selectedCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          subCategories={subCategories}
          filteredArticles={filteredArticles}
        />
      ) : (
        <FilterDesktop
          activeCategory={activeCategory}
          handleBackClick={handleBackClick}
          handleCategoryClick={handleCategoryClick}
          isSubCategories={isSubCategories}
          selectedCategory={selectedCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          subCategories={subCategories}
          filteredArticles={filteredArticles}
        />
      )}
    </>
  );
};
