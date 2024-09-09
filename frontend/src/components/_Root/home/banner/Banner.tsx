import Image from "next/image";
import React from "react";
import BannerImage from "../../../../../public/images/World Health Day Illustration.svg";
import { Button } from "@mantine/core";

const Banner = () => {
  return (
    <div className="flex flex-col gap-10 rounded-2xl bg-light px-8 py-10 text-darker md:mx-24 md:px-20 md:py-12">
      <h3 className="text-center text-xl font-semibold">En savoir plus</h3>
      <div className="flex flex-col items-center lg:flex-row">
        <Image
          src={BannerImage}
          alt=""
          className="relative -top-11 w-3/4 lg:-left-8 lg:w-[40%]"
        />
        <div className="flex flex-col gap-8">
          <p className="text-pretty text-sm font-medium md:text-lg">
            Le Pôle de Santé du Denain accueille des jeunes Médecins (Internes
            de Médecine Générale) issus de La Faculté de Médecine de LILLE, et
            des jeunes infirmiers issus de l'Institut de Formation des Métiers
            de la Santé (IFMS) de Valenciennes. Nous mettons en place des
            programmes d'ETP (Education Thérapeutique du Patient) dans le cadre
            du diabète de type 2, de l'obésité infantile: MRTC (Mission Retrouve
            ton Cap) et des troubles respiratoires (Asthme et
            Broncho-Pneumopathie Chronique Obstructive, Insuffisance cardiaque).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
