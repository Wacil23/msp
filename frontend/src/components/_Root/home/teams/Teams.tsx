"use client";
import {
  Profession,
  Professionnels,
} from "@/src/lib/types/users/profession/professions.types";
import { categorySpecificProfessions } from "@/src/utils/func/RegroupUserByProfession";
import { UserSession } from "@/types/next-auth";
import { DirectusUser } from "@directus/sdk";
import { Button, SegmentedControl } from "@mantine/core";
import React from "react";
import { FiMapPin } from "react-icons/fi";

type TeamsProps = {
  users: DirectusUser<UserSession>[];
};

const Teams: React.FC<TeamsProps> = ({ users }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<Profession>(
    Profession.Infirmiers
  );
  const [categoryData, setCategoryData] = React.useState<Professionnels[]>([]);

  React.useEffect(() => {
    setCategoryData(categorySpecificProfessions(users)[selectedCategory]);
  }, [selectedCategory, users]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Profession);
    setCategoryData(categorySpecificProfessions(users)[value as Profession]);
  };
  return (
    <>
      <h2 className="font-semibold text-4xl">L'équipe de la MSP </h2>
      <div className="flex flex-col  gap-9">
        <p className="text-lg  text-pretty">
          La MSP de Denain peux compter sur ses nombreux professionnels de
          santé, parmis eux :
        </p>
        <SegmentedControl
          fullWidth={false}
          color="primary.1"
          size="md"
          radius={"xs"}
          bg={"white"}
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
        <div className="grid grid-cols-4 gap-5">
          {categoryData
            ?.sort((a, b) => a.nom!.localeCompare(b.nom!))
            .map((person: Professionnels, index: number) => (
              <div
                key={index}
                className="p-10 flex flex-col gap-7 hover:bg-secondary bg-white group transition-colors duration-300 rounded-sm "
              >
                <div className="flex text-darker self-center flex-col gap-2">
                  <p className="font-semibold text-center">
                    {person.civilite} {person.nom?.toUpperCase()}{" "}
                    {person.prenom}
                  </p>
                  <p className="text-sm  underline cursor-pointer flex gap-3 items-center  font-semibold">
                    <FiMapPin />
                    {person.location}
                  </p>
                </div>
                <Button className="group-hover:bg-darker duration-300">
                  Contacter
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Teams;
