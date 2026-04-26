export const SITE = {
  name: "Pôle Santé du Denaisis",
  shortName: "MSP de Denain",
  baseline: "Maison de Santé Pluriprofessionnelle.",
  description:
    "Maison de Santé Pluriprofessionnelle du Denaisis. Médecins, infirmiers et paramédicaux pour un suivi coordonné, à Denain.",
  url:
    process.env.NEXT_PUBLIC_URL || "https://msp-denain.vercel.app",
};

export const CONTACT = {
  phone: "03 27 30 33 33",
  phoneHref: "tel:0327303333",
  email: "contact@docmsp.fr",
  emailHref: "mailto:contact@docmsp.fr",
  address: "570 rue Arthur Brunet, 59220 Denain",
  addressHref:
    "https://www.google.com/maps/search/?api=1&query=570+rue+Arthur+Brunet+59220+Denain",
  hours: [
    { day: "Lun – Ven", time: "8h00 – 19h00" },
    { day: "Samedi", time: "8h00 – 12h00" },
    { day: "Dim. & jours fériés", time: "Fermé" },
  ],
  emergency: {
    label: "Urgence vitale",
    number: "15",
    description: "SAMU — 24h/24",
  },
};

// Faits clés affichés dans le hero. Chiffres alignés avec la base scrap.
export const QUICK_FACTS = [
  { label: "Professionnels", value: "21" },
  { label: "Spécialités", value: "8" },
  { label: "Patients suivis", value: "5 000+" },
  { label: "À Denain depuis", value: "2018" },
];

export const DOCTOLIB_URL =
  "https://www.doctolib.fr/maison-de-sante/denain/msp-pole-de-sante-du-denaisis";
