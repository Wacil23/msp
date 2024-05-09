import { AspectRatio, Badge, Button, Card, Image, Text } from "@mantine/core";
import React from "react";

import { BlogArticle } from "@/src/lib/services/blog/BlogArticle";
import { BlogSubCategoriesProps } from "@/src/lib/services/blog/BlogCategory";
import Link from "next/link";

type PostProps = {
  article: BlogArticle;
  subCategories: BlogSubCategoriesProps[];
};
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS!;

export function ArticlesCardsGrid(article: BlogArticle) {
  return (
    <Card key={article.title} p="md" radius="md" component="a" href="#">
      <AspectRatio ratio={1920 / 1080}>
        <img
          className="rounded-md"
          src={directusUrl + article.image.filename_disk}
        />
      </AspectRatio>
      <Text c="dimmed" size="sm" tt="uppercase" fw={700} mt="md">
        {article.title}
      </Text>
      <Text size="xs" mt={5}>
        {article.small_description}
      </Text>
      <Button component={Link} href={"/blog/" + article.id}>
        Lire cet article
      </Button>
    </Card>
  );
}
const Post: React.FC<PostProps> = ({ article, subCategories }) => {
  return (
    <div className="p-6 rounded-md flex flex-col gap-4">
      {ArticlesCardsGrid(article)}
    </div>
  );
};

export default Post;
