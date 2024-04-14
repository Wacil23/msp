import { Button } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";
import HeroImage from "../../../public/images/Illustrations_médecins_Pana.svg";
const Home: React.FC = () => {
  return (
    <div className="flex relative flex-col gap-20">
      <div className="flex bg-primary-300  rounded-lg py-14 gap-5 md:flex-row  md:justify-around flex-col">
        <div className="flex md:flex-row md:justify-between flex-col items-center gap-4">
          <div className="flex flex-col gap-16">
            <div>
              <p className="mb-8">Bienvenue au pôle de santé de Denain</p>
              <h1 className="font-extrabold md:text-5xl mb-4  text-darker text-pretty leading-none text-center text-3xl">
                Unis pour votre bien-être
              </h1>
              <span className="font-semibold leading-6 text-lg">
                Des soins coordonnés au cœur de votre communauté
              </span>
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
          <Image src={HeroImage} width={550} height={550} alt="hero image" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-extrabold text-darker text-4xl">
          Qu'est ce qu'une MSP ?
        </h2>
        <p className="text-lg w-1/2">
          Les maisons de santé pluriprofessionnelles sont des structure de soins
          de proximité qui regroupent des professionnels de santé médicaux
          notamment des médecins généralistes et paramédicaux comme des
          infirmiers, des kinésithérapeutes ou des orthophonistes.
        </p>
      </div>
    </div>
  );
};

export default Home;
