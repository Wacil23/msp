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
import { FiMapPin, FiPhone } from "react-icons/fi";

type TeamsProps = {
  users: DirectusUser<UserSession>[];
};

const Teams: React.FC<TeamsProps> = ({ users }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<Profession>(
    Profession.Infirmiers,
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
    <div className="flex flex-col text-darker">
      <div className="flex flex-col gap-4 rounded-2xl bg-light/75 pb-14 md:mx-24 md:px-20 md:py-14">
        <h2 className="text-4xl font-semibold">L'équipe de la MSP </h2>
        <div className="flex flex-col gap-4">
          <SegmentedControl
            fullWidth={false}
            size="md"
            my={40}
            radius={"16"}
            withItemsBorders={false}
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
          <div className="grid grid-cols-4 gap-5">
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
                    <p className="flex cursor-pointer items-center gap-3 text-sm font-semibold underline">
                      <FiMapPin />
                      {person.location}
                    </p>
                  </div>
                  <Button
                    radius={"lg"}
                    variant="subtle"
                    className="duration-300 group-hover:text-darker"
                    leftSection={<FiPhone />}
                  >
                    Contacter
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
