import { Button } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { FiCalendar, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import bgHero from "@/public/images/Health professional team-amico.png";

const Home: React.FC = () => {
  const contactCard = [
    {
      name: "Téléphone",
      icon: <FiPhone className="text-xl text-primary-700" />,
      value: "03 27 30 33 33",
    },
    {
      name: "Email",
      icon: <FiMail className="text-xl text-primary-700" />,
      value: "contact@mspdenain.fr",
    },
    {
      name: "Lieu",
      icon: <FiMapPin className="text-xl text-primary-700" />,
      value: "570 rue Arthur Brunet, 59220 Denain",
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      <div className="flex py-[3.75rem] gap-5 px-7 bg-primary-500 flex-col">
        <div className="flex flex-col gap-4">
          <h1 className="font-extrabold text-darker text-pretty leading-none text-center text-3xl">
            Unis pour votre bien-être de test <br />
          </h1>
          <span className="font-normal text-center leading-6 text-lg">
            Des soins coordonnés au cœur de votre communauté
          </span>
        </div>
        <Image
          quality={100}
          alt="bg"
          src={bgHero}
          width={250}
          className="mx-auto"
        />
        <Button
          bg={"white"}
          c={"darker"}
          fw={"bold"}
          w={"fit-content"}
          mx={"auto"}
          rightSection={<FiCalendar />}
        >
          Prendre rendez-vous
        </Button>
      </div>
    </div>
  );
};

export default Home;
