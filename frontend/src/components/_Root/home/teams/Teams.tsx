"use client";
import React from "react";
import {
  Profession,
  Professionnels,
} from "@/src/lib/types/users/profession/professions.types";
import { categorySpecificProfessions } from "@/src/utils/func/RegroupUserByProfession";
import { UserSession } from "@/types/next-auth";
import { SegmentedControl } from "@mantine/core";
import { FiMapPin } from "react-icons/fi";
import { useWindowSize } from "@/src/lib/hooks/window/useWindowSize";

type TeamsProps = {
  users?: UserSession[];
};

const Teams: React.FC<TeamsProps> = ({ users }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<Profession>(
    Profession.Infirmiers,
  );
  const [categoryData, setCategoryData] = React.useState<Professionnels[]>([]);

  React.useEffect(() => {
    if (users) {
      setCategoryData(categorySpecificProfessions(users)![selectedCategory]);
    }
  }, [selectedCategory, users]);

  const handleCategoryChange = (value: string) => {
    if (users) {
      setSelectedCategory(value as Profession);
      setCategoryData(categorySpecificProfessions(users)![value as Profession]);
    }
  };

  const size = useWindowSize();
  const isMobile = size.width <= 768;

  return (
    <div className="flex flex-col text-darker">
      <div className="flex flex-col gap-4 rounded-2xl bg-light/75 px-4 py-10 md:mx-24 md:px-20 md:py-14">
        <h2 className="text-2xl font-semibold md:text-4xl">
          L'équipe de la MSP
        </h2>
        <div className="flex flex-col gap-4">
          <SegmentedControl
            fullWidth={isMobile}
            size={isMobile ? "sm" : "md"}
            my={40}
            radius={"16"}
            withItemsBorders={false}
            orientation={isMobile ? "vertical" : "horizontal"}
            bg={"#dcf1a7"}
            data={[
              "Infirmiers",
              "Médecin Généralistes",
              "Cardiologues",
              "Kinésithérapeutes",
              "Diététiciennes",
            ]}
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryData
              ?.sort((a, b) => a.nom!.localeCompare(b.nom!))
              .map((person: Professionnels, index: number) => (
                <div
                  key={index}
                  className="group flex flex-col gap-7 rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-2 self-center text-darker">
                    <p className="text-center font-semibold">
                      {person.civilite} {person.nom?.toUpperCase()}{" "}
                      {person.prenom}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(person.location!)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center gap-3 text-sm font-semibold underline"
                    >
                      <FiMapPin />
                      {person.location}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
