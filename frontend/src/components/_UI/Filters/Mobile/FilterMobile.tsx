import React from "react";
import { CategoriesFilterProps } from "../Filters";
import { Button, Collapse, Divider, Drawer } from "@mantine/core";
import { BiSolidCategory } from "react-icons/bi";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface FilterMobileProps extends CategoriesFilterProps {
  setActiveCategory: (category: string) => void;
  activeCategory: string;
  handleCategoryClick: (category: string) => void;
  handleBackClick: () => void;
  selectedCategory: string | null;
  isSubCategories: boolean;
}

const FilterMobile: React.FC<FilterMobileProps> = (props) => {
  const {
    categories,
    subCategories,
    filteredArticles,
    setActiveCategory,
    activeCategory,
  } = props;
  const [drawerOpened, { open, close }] = useDisclosure();
  const [_, { toggle }] = useDisclosure(false);
  const [categoryOpen, setCategoryOpen] = React.useState<string[]>([]);
  const handleOpenCategory = (categoryId: string) => {
    toggle();
    setCategoryOpen((prevOpenedCategories) =>
      prevOpenedCategories.includes(categoryId)
        ? prevOpenedCategories.filter((id) => id !== categoryId)
        : [categoryId],
    );
  };
  return (
    <div className="sticky top-[4.5rem] z-[1000] bg-white px-4 py-5">
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {filteredArticles.length}{" "}
          {filteredArticles.length > 1 ? "articles" : "article"}{" "}
        </p>
        <Button
          rightSection={<BiSolidCategory />}
          size="compact-sm"
          variant="light"
          onClick={open}
        >
          Catégories
        </Button>
        <Drawer.Root
          className="rounded-t-lg"
          opened={drawerOpened}
          onClose={close}
          position="bottom"
          size="lg"
        >
          <Drawer.Overlay />
          <Drawer.Content className="rounded-t-2xl">
            <Drawer.Header>
              <Drawer.Title className="m-auto font-semibold">
                Catégories
              </Drawer.Title>
              <Drawer.CloseButton m={0} />
            </Drawer.Header>
            <Drawer.Body>
              <p
                tabIndex={0}
                role="button"
                className="cursor-pointer py-3 underline underline-offset-1"
                onClick={() => {
                  close();
                  setActiveCategory("all");
                }}
              >
                Voir tout
              </p>
              {categories?.map((category) => {
                const isOpen = categoryOpen.includes(category.id);
                return (
                  <div className="mt-2 flex flex-col">
                    <div
                      tabIndex={0}
                      onClick={() => handleOpenCategory(category.id)}
                      className={`flex items-center justify-between bg-gray-100 px-8 py-5 ${isOpen ? "rounded-t-2xl" : "rounded-2xl"}`}
                    >
                      <p className="text-base font-medium" key={category.id}>
                        {category.title}
                      </p>
                      {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </div>
                    <Collapse
                      className="flex flex-col rounded-b-2xl bg-gray-100 duration-500"
                      in={isOpen}
                    >
                      {subCategories
                        ?.filter(
                          (subCat) =>
                            subCat.parent_category.title === category.title,
                        )
                        .map((subCat) => {
                          return (
                            <>
                              <Divider size="xs" color="#f1f1f1" />
                              <div className="px-8 py-2">
                                <p
                                  onClick={() => {
                                    close();
                                    setActiveCategory(subCat.title);
                                  }}
                                  className={`cursor-pointer ${activeCategory === subCat.title ? "font-semibold text-secondary" : ""}`}
                                >
                                  {subCat.title}
                                </p>
                              </div>
                            </>
                          );
                        })}
                    </Collapse>
                  </div>
                );
              })}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </div>
    </div>
  );
};

export default FilterMobile;
