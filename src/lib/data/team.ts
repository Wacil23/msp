export interface TeamMember {
  firstName: string;
  lastName: string;
  role: string;
  group: TeamGroup;
}

export type TeamGroup =
  | "Médecins généralistes"
  | "Spécialistes"
  | "Infirmiers"
  | "Paramédical";

export const TEAM_GROUPS: TeamGroup[] = [
  "Médecins généralistes",
  "Spécialistes",
  "Paramédical",
  "Infirmiers",
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    firstName: "Gilbert",
    lastName: "M'Bock",
    role: "Médecin généraliste · Responsable",
    group: "Médecins généralistes",
  },
  {
    firstName: "Antoine",
    lastName: "Deudon",
    role: "Médecin généraliste",
    group: "Médecins généralistes",
  },
  {
    firstName: "Ali",
    lastName: "Zekraoui",
    role: "Médecin généraliste",
    group: "Médecins généralistes",
  },
  {
    firstName: "Jean-Philippe",
    lastName: "Bricquet",
    role: "Médecin généraliste",
    group: "Médecins généralistes",
  },

  {
    firstName: "Cécile",
    lastName: "Donfack",
    role: "Cardiologue",
    group: "Spécialistes",
  },

  {
    firstName: "Edouard",
    lastName: "Jandrez",
    role: "Kinésithérapeute",
    group: "Paramédical",
  },
  {
    firstName: "Anne-Sophie",
    lastName: "Zielinski",
    role: "Diététicienne",
    group: "Paramédical",
  },

  {
    firstName: "Céline",
    lastName: "Andersz",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Céline",
    lastName: "Gressier",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Sandrine",
    lastName: "Flament",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Cyprien",
    lastName: "Leclercq",
    role: "Infirmier",
    group: "Infirmiers",
  },
  {
    firstName: "Rabbah",
    lastName: "Zekraoui",
    role: "Infirmier",
    group: "Infirmiers",
  },
  {
    firstName: "Allison",
    lastName: "Leclercq",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Audrey",
    lastName: "Delahaye",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Marine",
    lastName: "Hammou",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Isabelle",
    lastName: "André",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Fatima",
    lastName: "Saidi",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Barbara",
    lastName: "Sampe",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Sarah",
    lastName: "Boulanger",
    role: "Infirmière",
    group: "Infirmiers",
  },
  {
    firstName: "Sébastien",
    lastName: "Capdeville",
    role: "Infirmier",
    group: "Infirmiers",
  },
  {
    firstName: "Aline",
    lastName: "Caffart",
    role: "Infirmière",
    group: "Infirmiers",
  },
];

export const teamByGroup = (
  group: TeamGroup,
): TeamMember[] => TEAM_MEMBERS.filter((m) => m.group === group);

const initialOf = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

export const initialsFor = (member: TeamMember) =>
  initialOf(member.firstName + " " + member.lastName);
