import {
  AspectRatio,
  Badge,
  Breadcrumbs,
  Card,
  Overlay,
  Text,
  Tooltip,
} from "@mantine/core";
import React from "react";

import { BlogSubCategoriesProps } from "@/src/lib/services/blog/BlogCategory";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Urlify from "@/src/utils/func/Urlify";
import formatDate from "@/src/utils/func/GetLocalDate";
import { useBlogStore } from "@/src/store/blogStore";
import { BlogArticle } from "@/src/lib/types/blog/BlogArticle";

type PostProps = {
  article: BlogArticle;
  subCategories: BlogSubCategoriesProps[];
};
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS!;

export function ArticlesCardsGrid(article: BlogArticle) {
  const router = useRouter();
  const breadcrumbs = [
    { title: "Blog" },
    { title: article.category?.parent_category?.title ?? "autres" },
    { title: article.category?.title ?? undefined },
  ].map((item, index) => (
    <Text tabIndex={1} size="xs" fw={600} key={index}>
      {item.title}
    </Text>
  ));
  const setArticle = useBlogStore((state) => state.getArticleById);

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-xl focus:outline focus:outline-2 focus:outline-blue-500"
      key={article.title}
      bg={"#fafafa"}
      radius="lg"
      shadow="sm"
      tabIndex={1}
      p={25}
      onClick={() => {
        setArticle(article.id);
        const parentCategory = Urlify(article.category.parent_category.title);
        const category = Urlify(article.category.title);
        router.push(`/blog/${parentCategory}/${category}/${article.id}`);
      }}
    >
      <div className="flex flex-col gap-5">
        <AspectRatio ratio={16 / 9} className="relative">
          <img
            className="m-auto aspect-video rounded-3xl object-cover"
            src={directusUrl + article.image.filename_disk}
          />
          <Overlay radius={24} color="#000" backgroundOpacity={0.1} />
        </AspectRatio>
        <div>
          <Breadcrumbs separator=">">{breadcrumbs}</Breadcrumbs>
        </div>
        <div className="flex items-center justify-between gap-5 whitespace-nowrap">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <CiCalendar />
              <Text fw={600} c={"darker.1"} size="xs">
                {formatDate(article.date_created)}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <CiClock1 className="text-darker" />
              <Text fw={600} c={"darker.1"} size="xs">
                {article.read_time + " min"}
              </Text>
            </div>
          </div>
          <Tooltip
            transitionProps={{ transition: "rotate-left", duration: 300 }}
            color="gray"
            label={article.category?.title ?? "Autres"}
          >
            <Badge
              radius={"lg"}
              className="flex items-center gap-2 text-darker"
              color="light.1"
              fw={600}
              c={"darker.1"}
              size="xs"
              tabIndex={1}
            >
              <Text fw={700} truncate="end" size="10">
                {article.category?.title ?? "Autres"}
              </Text>
            </Badge>
          </Tooltip>
        </div>
      </div>
      <Text mih={50} size="md" c={"darker.1"} tt="capitalize" fw={700} mt="md">
        {article.title}
      </Text>

      <Text lineClamp={3} size="sm" c={"darker.1"} fw={300} mt={5}>
        {article.small_description}
      </Text>
    </Card>
  );
}
const Post: React.FC<PostProps> = ({ article, subCategories }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg">
      {ArticlesCardsGrid(article)}
    </div>
  );
};

export default Post;
