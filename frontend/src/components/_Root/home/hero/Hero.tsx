"use client";
import React from "react";
import HeroImage from "../../../../../public/images/Hero.svg";
import Image from "next/image";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="mx-4 flex h-auto flex-col items-center justify-between py-8 md:mx-28 md:h-[90dvh] md:flex-row md:py-0">
      <div className="flex w-full flex-col gap-12 md:w-1/2 md:gap-24">
        <p className="text-center text-lg text-darker md:text-start md:text-xl">
          Bienvenue à la MSP de Denain
        </p>
        <div className="flex flex-col gap-6 md:gap-8">
          <h1 className="text-center text-2xl font-semibold text-darker md:text-start md:text-4xl">
            Votre santé, notre priorité de test : <br />
            Ensemble vers un bien-être optimal !
          </h1>
          <p className="text-center text-sm text-darker md:text-start md:text-lg">
            La MSP de Denain regroupent les soins au sein d'un même territoire
            pour donnez accès à la santé pour chacun d'entre vous
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
          <Button w={"50%"} radius={"xl"}>
            Prendre rendez-vous
          </Button>
        </div>
      </div>
      <div className="relative mt-8 hidden w-full flex-col gap-14 md:mt-0 md:flex md:w-[40%]">
        <motion.div
          initial={{ width: "6rem" }}
          animate={{ width: "20rem" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="top-0 h-24 rounded-full bg-[#23410C]"
        ></motion.div>
        <motion.div
          initial={{ width: "6rem" }}
          animate={{ width: "25rem" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="top-2/4 h-24 w-[6rem] rounded-full bg-secondary"
        ></motion.div>
        <motion.div
          initial={{ width: "6rem" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="top-full h-24 w-[6rem] rounded-full bg-[#DCF1A7]"
        ></motion.div>
        <Image className="absolute -top-2 z-10" src={HeroImage} alt="" />
      </div>
    </div>
  );
};

export default Hero;
