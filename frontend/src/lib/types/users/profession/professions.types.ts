export type Professionnels = {
  nom: string | null;
  civilite: string | null;
  prenom: string | null;
  location: string | null;
};

export enum Profession {
  Infirmiers = "Infirmiers",
  "Médecins Généralistes" = "Médecins Généralistes",
  Cardiologues = "Cardiologues",
  Kinésithérapeutes = "Kinésithérapeutes",
  Diététiciennes = "Diététiciennes",
}
