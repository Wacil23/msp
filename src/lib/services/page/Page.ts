// Static SEO content — previously stored in Directus, now bundled in code.
// Edit this map when you need to update meta tags for a page.

export type PageSeo = {
  seo: {
    meta_title: string;
    meta_description: string;
  };
};

const PAGES_SEO: Record<string, PageSeo> = {
  home: {
    seo: {
      meta_title: "MSP de Denain — Maison de Santé Pluridisciplinaire",
      meta_description:
        "La Maison de Santé Pluridisciplinaire de Denain regroupe des professionnels de santé au service des patients de la commune et des alentours.",
    },
  },
  faq: {
    seo: {
      meta_title: "FAQ — MSP de Denain",
      meta_description:
        "Toutes les réponses aux questions fréquentes des patients de la Maison de Santé Pluridisciplinaire de Denain.",
    },
  },
  blog: {
    seo: {
      meta_title: "Actualités — MSP de Denain",
      meta_description:
        "Retrouvez les dernières actualités et conseils santé publiés par les professionnels de la MSP de Denain.",
    },
  },
  contact: {
    seo: {
      meta_title: "Contact — MSP de Denain",
      meta_description:
        "Contactez la Maison de Santé Pluridisciplinaire de Denain : adresse, téléphone et formulaire de contact.",
    },
  },
  about: {
    seo: {
      meta_title: "L'équipe — MSP de Denain",
      meta_description:
        "Découvrez l'équipe pluriprofessionnelle de la Maison de Santé du Denaisis : médecins, infirmiers, kinésithérapeutes et spécialistes.",
    },
  },
};

const FALLBACK_SEO: PageSeo = {
  seo: {
    meta_title: "MSP de Denain",
    meta_description: "Maison de Santé Pluridisciplinaire de Denain.",
  },
};

export const getPageSeo = async (slug: string): Promise<PageSeo> => {
  return PAGES_SEO[slug] ?? FALLBACK_SEO;
};
