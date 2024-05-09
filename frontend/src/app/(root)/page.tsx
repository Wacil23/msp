import { Button } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";
import HeroImage from "../../../public/images/Illustrations_médecins_Pana.svg";
import Teams from "@/src/components/_Root/home/teams/Teams";
import { getMembersUsers } from "@/src/lib/services/users/Users";
import Banner from "@/src/components/_Root/home/banner/Banner";

const Home: React.FC = async () => {
  const users = await getMembersUsers("");

  return (
    <div className="flex relative flex-col gap-20">
      <div className="flex bg-primary  md:rounded-lg py-14 gap-5 md:flex-row md:mx-24 md:my-24 md:justify-around flex-col">
        <div className="flex md:flex-row md:justify-between flex-col items-center gap-4">
          <div className="flex text-center flex-col gap-16">
            <div>
              <p className="mb-4 text-md md:text-2xl">
                Bienvenue au pôle de santé de Denain
              </p>
              <h1 className="font-extrabold md:text-5xl mb-4  rounded-md text-darker text-pretty leading-none text-center text-2xl">
                Unis pour votre bien-être
              </h1>
              <span className="font-semibold leading-6 md:text-lg">
                Des soins coordonnés au cœur de votre communauté
              </span>
            </div>
            <div className="flex mx-auto flex-col md:flex-row items-center gap-8">
              <Button
                variant="default"
                w={"100%"}
                rightSection={<FiCalendar />}
              >
                Prendre rendez-vous
              </Button>
              <Button variant="filled" w={"100%"} rightSection={<FiUsers />}>
                Devenir membre
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <Image src={HeroImage} width={550} height={550} alt="hero image" />
        </div>
      </div>
      <div className="flex flex-col md:mx-24 pb-14">
        <h2 className="font-semibold text-darker text-4xl">
          Qu'est ce qu'une MSP ?
        </h2>
        <div className="flex items-center  gap-28">
          <p className="text-lg w-[55%]">
            Les maisons de santé pluriprofessionnelles sont des structure de
            soins de proximité qui regroupent des professionnels de santé
            médicaux notamment des médecins généralistes et paramédicaux comme
            des infirmiers, des kinésithérapeutes ou des orthophonistes.
            <br />
            <br />
            Le travail en coordination des différents professionnels est
            inhérent au fonctionnement des MSP. Le regroupement de plusieurs
            types de professionnels en un même lieu – comme c’est le plus
            souvent le cas - et leur coordination permettent un accès aux soins
            facilité, une continuité des soins en cas d’absence ou
            indisponibilité du professionnel et d’une prise en charge globale et
            coordonnée entre les différents acteurs autour des besoins du
            patient.
          </p>
          <iframe
            className="rounded-lg"
            width="50%"
            height="400"
            src="https://www.youtube-nocookie.com/embed/Rz0zCWxAsqE?si=Jzd-SWmn6SLT690K&amp;controls=0&amp;loop=1&amp;modestbranding=1"
            title="Qu'est ce qu'une msp"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex bg-primary flex-col gap-10 md:p-24 pb-14">
          <Teams users={users} />
        </div>
      </div>
      <div className="flexflex-col gap-10 md:px-24 ">
        <h2 className="font-semibold text-darker text-4xl">Nos partenaires</h2>
      </div>
      <div className="flex bg-secondary text-white flex-col gap-10 md:px-24 md:py-12">
        <Banner />
      </div>
    </div>
  );
};

export default Home;
