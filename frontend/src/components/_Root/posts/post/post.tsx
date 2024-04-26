import { Badge, Button } from "@mantine/core";
import React from "react";
import Image from "next/image";
import { BlogArticle } from "@/src/lib/services/blog/BlogArticle";
import { BlogSubCategoriesProps } from "@/src/lib/services/blog/BlogCategory";

type PostProps = {
  article: BlogArticle;
  subCategories: BlogSubCategoriesProps[];
};
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS;
const Post: React.FC<PostProps> = ({ article, subCategories }) => {
  return (
    <div className="w-[480px] p-6 bg-primary rounded-md flex flex-col gap-4">
      <img
        src={directusUrl + article.image.filename_disk}
        width={300}
        height={300}
        alt=""
        className="w-full rounded-md max-h-52 object-cover"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-stretch justify-between">
          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center gap-4">
              <Badge color="primary.3">
                {article.category.parent_category.title}
              </Badge>{" "}
              <Badge>{article.category.title}</Badge>
            </div>
            <h3 className="font-bold text-lg text-darker min-h-[60px]">
              {article.title}
            </h3>
            <p className="font-medium text-sm text-darker min-h-[60px]">
              {article.small_description}
            </p>
          </div>
          <Button w={"fit-content"}>Lire l'article</Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
