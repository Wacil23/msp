"use client";
import Image from "next/image";
import React from "react";
import ContactUs from "@/public/images/Contact us.svg";
import AuthForm from "@/src/components/_Root/form/AuthForm";
import { ThemeIcon } from "@mantine/core";
import { GrArticle } from "react-icons/gr";

const Contact = () => {
  return (
    <div>
      <div className="border-t md:min-h-96 md:max-h-96 border-l border-r flex flex-col items-center  bg-lightGreen border-stroke rounded-t-lg rounded-tl-lg">
        <div className="flex py-[3.75rem]  px-7 flex-col gap-8 items-center">
          <ThemeIcon size="xl" variant="light" color="lime.5">
            <GrArticle style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
          <div className="flex flex-col gap-5 items-center mt-10">
            <h1 className="text-4xl text-darker font-bold">Contactez nous</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
