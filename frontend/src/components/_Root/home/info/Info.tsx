"use client";
import { Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const Info = () => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className="mx-10 mb-36 flex flex-col gap-12 md:mx-24">
      <h2 className="text-2xl font-semibold text-darker md:text-4xl">
        Qu'est ce qu'une MSP ?
      </h2>
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-28">
        <div className="flex flex-col items-start md:w-[55%]">
          <p className="text-md md:text-lg">
            Les maisons de santé pluriprofessionnelles sont des structure de
            soins de proximité qui regroupent des professionnels de santé
            médicaux notamment des médecins généralistes et paramédicaux comme
            des infirmiers, des kinésithérapeutes ou des orthophonistes.
            <br />
          </p>
          {!opened && (
            <Button
              variant="transparent"
              className="my-2 md:my-4"
              p={0}
              onClick={toggle}
            >
              Voir plus
            </Button>
          )}
          <Collapse in={opened}>
            <p className="text-md md:text-lg">
              <br />
              Le travail en coordination des différents professionnels est
              inhérent au fonctionnement des MSP. Le regroupement de plusieurs
              types de professionnels en un même lieu – comme c’est le plus
              souvent le cas - et leur coordination permettent un accès aux
              soins facilité, une continuité des soins en cas d’absence ou
              indisponibilité du professionnel et d’une prise en charge globale
              et coordonnée entre les différents acteurs autour des besoins du
              patient.
            </p>
          </Collapse>
          {opened && (
            <Button
              p={0}
              variant="transparent"
              className="mt-2 md:mt-4"
              onClick={toggle}
            >
              Voir moins
            </Button>
          )}
        </div>
        <iframe
          className="rounded-3xl"
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
  );
};

export default Info;
