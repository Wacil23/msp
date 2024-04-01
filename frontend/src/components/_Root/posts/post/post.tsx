import { Button } from "@mantine/core";
import React from "react";
import Image from "next/image";
import { BlogArticle } from "@/src/lib/services/blog/BlogArticle";

type PostProps = {
  className: string;
  article: BlogArticle;
};

const Post: React.FC<PostProps> = ({ className, article }) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-8">
        <>
          <p className="text-darker decoration-primary-300 underline underline-offset-8 text-xl font-semibold"></p>
          <div className="w-full flex justify-end">
            <Image
              src={
                "http://host.docker.internal:8055/assets/" +
                article.image.filename_disk
              }
              width={300}
              height={300}
              alt=""
              priority={true}
              className="rounded-t-lg rounded-tr-lg h-40 object-cover w-[70%]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col w-3/4 gap-2">
              <h3 className="font-bold text-xl text-darker">{article.title}</h3>
              <p className="font-medium text-sm text-darker">
                {article.small_description}
              </p>
            </div>
            <Button>En savoir plus</Button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Post;
