"use client";
import React from "react";
import ARS from "../../../../../public/images/MSP partenaires/ARS.png";
import CH from "../../../../../public/images/MSP partenaires/CH.png";
import Denain from "../../../../../public/images/MSP partenaires/Denain.png";
import Hainaut from "../../../../../public/images/MSP partenaires/Hainaut.png";
import CPAM from "../../../../../public/images/MSP partenaires/CPAM.png";
import Ministere from "../../../../../public/images/MSP partenaires/Ministere.png";
import Image from "next/image";
import { useWindowSize } from "@/src/lib/hooks/window/useWindowSize";

const Partnairs = () => {
  const size = useWindowSize();
  const isMobile = size.width <= 768;
  const partenaires = [
    {
      nom: "ARS",
      image: ARS,
      width: isMobile ? 90 : 150,
    },
    {
      nom: "CH",
      image: CH,
      width: isMobile ? 50 : 110,
    },
    {
      nom: "Denain",
      image: Denain,
      width: isMobile ? 90 : 150,
    },
    {
      nom: "Hainaut",
      image: Hainaut,
      width: isMobile ? 90 : 150,
    },
    {
      nom: "CPAM",
      image: CPAM,
      width: isMobile ? 90 : 150,
    },
    {
      nom: "Ministère",
      image: Ministere,
      width: isMobile ? 90 : 150,
    },
  ];
  return (
    <div className="mx-4 my-12 flex flex-col gap-16 md:my-20 md:gap-24 md:px-20 lg:my-28 lg:px-24">
      <h2 className="text-2xl font-semibold text-darker lg:text-4xl">
        Nos partenaires
      </h2>
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
          {partenaires.map((partenaire) => {
            return (
              <li key={partenaire.nom}>
                <Image
                  className="grayscale transition-all duration-500 hover:grayscale-0"
                  width={partenaire.width}
                  height={partenaire.width}
                  src={partenaire.image}
                  alt={partenaire.nom}
                />
              </li>
            );
          })}
        </ul>
        <ul
          className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
          aria-hidden="true"
        >
          {partenaires.map((partenaire) => {
            return (
              <li key={partenaire.nom}>
                <Image
                  className="grayscale transition-all duration-500 hover:grayscale-0"
                  width={partenaire.width}
                  height={partenaire.width}
                  src={partenaire.image}
                  alt={partenaire.nom}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Partnairs;
