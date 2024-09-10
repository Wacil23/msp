"use client";
import { useWindowSize } from "@/src/lib/hooks/window/useWindowSize";
import { Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { YouTubeEmbed } from "@next/third-parties/google";
import React from "react";

const Info = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useWindowSize().width < 768;
  return (
    <div className="mx-4 mb-8 flex flex-col gap-12 md:mx-20 lg:mx-24 lg:mb-36">
      <h2 className="text-xl font-semibold text-darker md:text-2xl lg:text-4xl">
        Qu'est ce qu'une MSP ?
      </h2>
      <div className="flex flex-col items-center gap-12 md:gap-20 lg:flex-row lg:gap-28">
        <div className="flex flex-col items-start lg:w-[55%]">
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
        <div className="w-full rounded-3xl lg:w-1/2">
          <YouTubeEmbed
            style="border-radius: 1.5rem"
            params="controls=0&loop=1&modestbranding=1"
            videoid="Rz0zCWxAsqE"
            height={isMobile ? 200 : 400}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
