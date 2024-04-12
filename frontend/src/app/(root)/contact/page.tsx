"use client";
import Image from "next/image";
import React from "react";
import ContactUs from "@/public/images/Contact us.svg";
import AuthForm from "@/src/components/_Root/form/AuthForm";
import { Button, ThemeIcon } from "@mantine/core";
import { GrArticle } from "react-icons/gr";
import { FiCalendar, FiUsers } from "react-icons/fi";

const Contact = () => {
  return (
    <div>
      <div className="flex bg-primary-300  rounded-lg py-14 gap-5 md:flex-row  md:justify-around flex-col">
        <div className="flex md:flex-row md:justify-between flex-col items-center gap-4">
          <div className="flex flex-col gap-16">
            <div>
              <h1 className="font-extrabold md:text-5xl mb-4  text-darker text-pretty leading-none text-center text-3xl">
                Contactez-nous
              </h1>
              <span className="font-semibold leading-6 text-lg"></span>
            </div>
            <div className="flex items-center gap-8">
              <Button
                bg={"main"}
                c={"darker"}
                fw={"bold"}
                size="md"
                variant="outline"
                rightSection={<FiCalendar />}
              >
                Prendre rendez-vous
              </Button>
              <Button
                variant="filled"
                size="md"
                fw={"bold"}
                rightSection={<FiUsers />}
              >
                Devenir membre
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <Image
            src={"/images/Illustrations_médecins_Pana.svg"}
            width={550}
            height={550}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
