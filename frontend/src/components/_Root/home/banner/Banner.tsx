import Image from "next/image";
import React from "react";
import BannerImage from "../../../../../public/images/World Health Day Illustration.svg";

const Banner = () => {
  return (
    <div>
      <h3 className="text-center font-semibold text-2xl">En savoir plus</h3>
      <div className="flex items-center">
        <Image src={BannerImage} alt="" className="w-[35%] relative -top-11" />
        <p className="font-medium text-pretty text-lg">
          Le Pôle de Santé du Denain accueille des jeunes Médecins ( Internes de
          Médecine Générale) issus de La Faculté de Médecine de LILLE, et des
          jeunes infirmiers issus de l'Institut de Formation des Métiers de la
          Santé (IFMS) de Valenciennes. Nous mettons en place des programmes
          d'ETP ( Education Thérapeutique du Patient) dans le cadre du diabète
          de type 2, de l'obésité infantile: MRTC (Mission Retrouve ton Cap) et
          des troubles respiratoires ( Asthme et Broncho-Pneumopathie Chronique
          Obstructive, Insuffisance cardiaque).
        </p>
      </div>
    </div>
  );
};

export default Banner;
