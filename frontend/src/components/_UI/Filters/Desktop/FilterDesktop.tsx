import { PostsProps } from "@/src/components/_Root/posts/posts";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import classes from "../../../../config/theme/theme.module.css";
import React from "react";
import { CategoriesFilterProps } from "../Filters";

interface FilterDesktopProps extends CategoriesFilterProps {
  setActiveCategory: (category: string) => void;
  activeCategory: string;
  handleCategoryClick: (category: string) => void;
  handleBackClick: () => void;
  selectedCategory: string | null;
  isSubCategories: boolean;
}

const FilterDesktop: React.FC<FilterDesktopProps> = (props) => {
  const {
    setActiveCategory,
    categories,
    subCategories,
    activeCategory,
    handleBackClick,
    handleCategoryClick,
    selectedCategory,
    isSubCategories,
  } = props;
  return (
    <div className="relative hidden overflow-hidden rounded-full bg-[#fafafa] py-7 lg:flex">
      <div
        className={`absolute top-1/2 flex w-full items-center justify-evenly gap-8 overflow-auto text-nowrap px-8 py-4 ${isSubCategories ? classes.categoryTranslateUp : "-translate-y-1/2 opacity-100 transition-all duration-300"}`}
      >
        <p
          tabIndex={0}
          className={`cursor-pointer text-sm ${activeCategory === "all" ? "underline-darker font-semibold text-darker underline underline-offset-2" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          Tout
        </p>
        {categories
          ?.filter((cat) => cat.title !== "Autres")
          .map((category) => (
            <p
              tabIndex={0}
              className={`flex cursor-pointer items-center gap-2 text-sm ${
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
          tabIndex={0}
          onClick={() => setActiveCategory("autres")}
          className={`cursor-pointer text-sm ${activeCategory === "autres" ? "underline-darker font-semibold text-darker underline underline-offset-2" : ""}`}
        >
          Autres
        </p>
      </div>
      <div
        className={`absolute top-1/2 flex w-full items-center justify-evenly gap-8 overflow-auto text-nowrap px-4 py-8 text-sm ${isSubCategories ? classes.subcategoryTranslateUp : "translate-y-[4rem] opacity-0"}`}
      >
        <div>
          <IoIosArrowBack
            className="cursor-pointer"
            onClick={() => handleBackClick()}
          >
            Retour
          </IoIosArrowBack>
        </div>
        {subCategories
          ?.filter(
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
  );
};

export default FilterDesktop;
