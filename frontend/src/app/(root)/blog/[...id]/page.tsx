"use client";
import Hero from "@/src/components/_Root/hero/hero";
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
    <div className="mx-28 flex flex-col">
      <Hero title={"Article de la MSP"} subtitle={article.title} />
      <div className="flex items-start gap-8">
        <div className="0 sticky top-32 flex h-full w-1/3 flex-col gap-10">
          <div className="flex flex-col gap-5 rounded-lg border border-slate-100 p-5 shadow-md">
            <div className="flex items-center gap-3">
              <IoNewspaperOutline color="#23410C" />
              <h3 className="text-lg font-medium text-darker">
                Notre newsletter
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              <TextInput
                placeholder="Entrez votre adresse email"
                leftSection={<BsAt />}
                label="Inscrivez vous à notre newsletter"
              />
              <Button variant="outline" color="darker.1" className="w-full">
                S'inscrire
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-lg border border-slate-100 p-5 shadow-md">
            <div className="flex items-center gap-3">
              <IoShareSocial color="#23410C" />
              <h3 className="text-lg font-medium text-darker">Partagez sur</h3>
            </div>
            <div className="flex items-center justify-between gap-3">
              <BsFacebook
                size={20}
                className="cursor-pointer"
                onClick={() => null}
              />
              <BsTwitterX
                size={20}
                className="cursor-pointer"
                onClick={() => null}
              />
              <BsInstagram
                size={20}
                className="cursor-pointer"
                onClick={() => null}
              />
              <BsWhatsapp
                size={20}
                className="cursor-pointer"
                onClick={() => null}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-12">
          <img
            className="mx-auto aspect-video h-[30rem] w-full rounded-3xl object-cover shadow-md transition-shadow hover:shadow-lg"
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
            className="mb-24"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Article;
