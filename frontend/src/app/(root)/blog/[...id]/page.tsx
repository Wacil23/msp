"use client";
import Hero from "@/src/components/_Root/hero/hero";
import styles from "./article.module.css";
import { useBlogStore } from "@/src/store/blogStore";
import { Badge, Blockquote, Button, TextInput } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import {
  BsAt,
  BsClock,
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import { FiInfo } from "react-icons/fi";
import { IoNewspaperOutline, IoShareSocial } from "react-icons/io5";
import formatDate from "../../../../utils/func/GetLocalDate";
import { CgCalendar } from "react-icons/cg";

export const ShareButtons = () => {
  const articleUrl = "https://docmsp.fr/blog"; // URL de l'article à partager
  const message = encodeURIComponent("Découvrez cet article incroyable !");

  return (
    <>
      <BsFacebook
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
            "_blank",
          );
        }}
      />
      <BsTwitterX
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?url=${articleUrl}&text=${message}`,
            "_blank",
          );
        }}
      />
      <BsInstagram
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open("https://www.instagram.com/", "_blank"); // Redirige vers Instagram
        }}
      />
      <BsWhatsapp
        size={20}
        className="cursor-pointer"
        onClick={() => {
          window.open(
            `https://wa.me/?text=${message}%20${articleUrl}`,
            "_blank",
          );
        }}
      />
    </>
  );
};

const Article = () => {
  const params = useParams();
  const { id } = params;
  const article = useBlogStore((state) => state.article);
  const setArticle = useBlogStore((state) => state.getArticleById);
  const diretcusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS;
  React.useEffect(() => {
    if (!article) {
      setArticle(id[id.length - 1]);
    }
  }, [article]);

  if (!article) {
    return;
  }

  return (
    <div className="mx-10 flex flex-col lg:mx-28 lg:mb-28">
      <div className="py-12 md:py-16">
        <Hero title={"Article de la MSP"} subtitle={article.title} />
      </div>
      <div className="mt-6 flex flex-col-reverse items-start gap-8 lg:flex-row">
        <div className="0 top-32 flex h-full w-full flex-col gap-10 lg:sticky lg:w-1/3">
          <div className="flex flex-col gap-5 rounded-lg border border-slate-100 p-5 shadow-md">
            <div className="flex items-center gap-3">
              <IoShareSocial color="#23410C" />
              <h3 className="text-lg font-medium text-darker">Partagez sur</h3>
            </div>
            <div className="flex items-center justify-between gap-3">
              <ShareButtons />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-12">
          <img
            className="mx-auto aspect-video h-[20rem] w-full rounded-3xl object-cover shadow-md transition-shadow hover:shadow-lg lg:h-[30rem]"
            src={diretcusUrl + article.image.filename_disk}
          />
          <div className="flex items-center gap-5">
            <Badge color="light.1">
              <p className="flex items-center gap-3 text-darker">
                <BsClock />
                {article.read_time} min
              </p>
            </Badge>
            <Badge color="light.1">
              <p className="flex items-center gap-3 text-darker">
                <CgCalendar />
                {formatDate(article.date_created)}
              </p>
            </Badge>
          </div>
          <Blockquote
            color="light.1"
            radius="md"
            icon={<FiInfo size={30} />}
            iconSize={40}
            mt="xl"
            className="font-medium text-darker"
          >
            {article.small_description}
          </Blockquote>
          <div
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Article;
