"use client";
import React from "react";
import HeroImage from "../../../../../public/images/Hero.svg";
import Image from "next/image";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="mx-28 flex h-[90dvh] items-center justify-between">
      <div className="flex w-1/2 flex-col gap-24">
        <h3 className="text-xl text-darker">Bienvenue à la MSP de Denain</h3>
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-semibold text-darker">
            Votre santé, notre priorité : <br />
            Ensemble vers un bien-être optimal !
          </h1>
          <p className="text-lg text-darker">
            La MSP de Denain regroupent les soins au sein d’un même territoire
            pour donnez accès à la santé pour chacun d’entre vous
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Button w={"45%"} radius={"xl"}>
            Prendre rendez-vous
          </Button>
          <Button w={"45%"} radius={"xl"} variant="outline">
            Devenir membre
          </Button>
        </div>
      </div>
      <div className="relative flex w-[40%] flex-col gap-14">
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
