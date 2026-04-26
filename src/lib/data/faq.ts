export interface FaqItem {
  question: string;
  reponse: string;
}

export interface FaqSection {
  title: string;
  description?: string;
  items: FaqItem[];
}

// Static FAQ — modifiez ce fichier pour faire évoluer la page FAQ.
export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "La MSP en pratique",
    items: [
      {
        question:
          "Qu'est-ce que la Maison de Santé Pluriprofessionnelle de Denain ?",
        reponse:
          "La MSP de Denain regroupe en un même lieu plusieurs professionnels de santé (médecins, infirmiers, kinésithérapeutes, spécialistes…) qui exercent ensemble afin d'offrir un parcours de soins coordonné aux patients du bassin denaisien.",
      },
      {
        question: "Comment devenir patient de la MSP ?",
        reponse:
          "Il vous suffit de prendre rendez-vous avec l'un des médecins généralistes pour qu'il devienne votre médecin traitant. Vous pourrez ensuite être orienté vers les autres professionnels selon vos besoins.",
      },
      {
        question: "Y a-t-il un parking à proximité ?",
        reponse:
          "Oui, un parking gratuit est mis à disposition des patients juste à côté de la MSP, au 570 rue Arthur Brunet à Denain.",
      },
    ],
  },
  {
    title: "Rendez-vous & accès aux soins",
    items: [
      {
        question: "Comment prendre rendez-vous avec un professionnel ?",
        reponse:
          "Vous pouvez prendre rendez-vous directement auprès du professionnel de votre choix via Doctolib (recommandé) ou par téléphone au 03 27 30 33 33. Le formulaire de contact reste disponible pour les questions non urgentes.",
      },
      {
        question: "Que faire en cas d'urgence ?",
        reponse:
          "Si vous êtes face à une urgence vitale, composez immédiatement le 15 (SAMU). Pour une urgence non vitale, le 116 117 (médecin de garde) ou les urgences hospitalières de Denain prennent le relai en dehors de nos horaires.",
      },
      {
        question: "Êtes-vous conventionnés Sécurité sociale ?",
        reponse:
          "Oui, l'ensemble des professionnels exerçant à la MSP sont conventionnés secteur 1, ce qui garantit le tiers payant et le respect des tarifs de la Sécurité sociale.",
      },
    ],
  },
  {
    title: "Suivi & coordination",
    items: [
      {
        question:
          "Comment les professionnels de la MSP se coordonnent-ils autour de mon suivi ?",
        reponse:
          "Les professionnels échangent régulièrement (réunions de concertation, dossier partagé) afin d'assurer la continuité des soins. Cela permet d'éviter les redondances et de partager les informations pertinentes pour votre santé, dans le strict respect du secret médical.",
      },
      {
        question: "Proposez-vous des programmes d'éducation thérapeutique ?",
        reponse:
          "Oui. Nous animons des programmes ETP sur le diabète de type 2, l'obésité infantile (MRTC), l'asthme, la BPCO et l'insuffisance cardiaque. Parlez-en à votre médecin pour évaluer si l'un de ces programmes peut vous aider.",
      },
      {
        question: "Accueillez-vous des stagiaires et internes ?",
        reponse:
          "Oui. La MSP est un lieu de formation : nous accueillons régulièrement des internes en médecine générale (Faculté de Lille) et des étudiants infirmiers de l'IFMS de Valenciennes. Leur intervention est toujours encadrée par un professionnel diplômé.",
      },
    ],
  },
];
