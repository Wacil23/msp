"use client";
import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import { FaArrowRightLong } from "react-icons/fa6";
const Partnairs = dynamic(() => import("../partnairs/Partnairs"), {
  ssr: false,
});

const Hero = () => {
  return (
    <div className="h-hero relative mx-4 flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-primary px-4 py-8 md:mx-8 md:px-28 md:pb-12 md:pt-24">
      <div className="m-auto flex w-full flex-col gap-14 md:gap-24 lg:w-1/2">
        <div className="flex flex-col">
          <span className="gap-1 text-center text-sm font-light">
            -Dr.Gilbert M'Bock
          </span>
          <p className="text-center text-lg text-darker lg:text-xl">
            Bienvenue à la MSP de Denain
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-medium text-darker md:text-4xl">
            Votre santé, notre priorité : <br />
            Ensemble vers un bien-être optimal !
          </h1>
          <p className="text-center text-sm text-darker md:text-lg">
            La MSP de Denain regroupe les soins au sein d'un même territoire
            pour donner accès à la santé pour chacun d'entre vous
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 self-center md:flex-row md:justify-between md:gap-0">
          <Button
            rightSection={<FaArrowRightLong />}
            radius={"xl"}
            className="w-full transition-all hover:bg-darker hover:text-light"
            onClick={() =>
              (window.location.href =
                "https://www.doctolib.fr/maison-de-sante/denain/msp-pole-de-sante-du-denaisis/booking/new-patient")
            }
          >
            Prendre rendez-vous
          </Button>
        </div>
      </div>
      <Partnairs />
    </div>
  );
};

export default Hero;
