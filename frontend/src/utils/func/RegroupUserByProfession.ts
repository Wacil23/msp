import { Professionnels } from "@/src/lib/types/users/profession/professions.types";
import { UserSession } from "@/types/next-auth";
import { DirectusUser } from "@directus/sdk";

export const categorySpecificProfessions = (
  users: DirectusUser<UserSession>[]
): Record<string, Professionnels[]> => {
  const result: Record<string, Professionnels[]> = {};

  users.forEach((user) => {
    if (user.profession) {
      const professionKey = user.profession;
      if (professionKey.includes("Infirmi")) {
        if (result["Infirmiers"]) {
          result["Infirmiers"].push({
            nom: user.last_name,
            prenom: user.first_name,
            civilite: user.civility!,
            location: user.location,
          });
        } else {
          result["Infirmiers"] = [
            {
              nom: user.last_name,
              prenom: user.first_name,
              civilite: user.civility!,
              location: user.location,
            },
          ];
        }
      } else {
        if (result[professionKey + "s"]) {
          result[professionKey + "s"].push({
            nom: user.last_name,
            prenom: user.first_name,
            civilite: user.civility!,
            location: user.location,
          });
        } else {
          result[professionKey + "s"] = [
            {
              nom: user.last_name,
              prenom: user.first_name,
              civilite: user.civility!,
              location: user.location,
            },
          ];
        }
      }
    }
  });
  return result;
};
