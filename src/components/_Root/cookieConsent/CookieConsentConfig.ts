import { type CookieConsentConfig } from "vanilla-cookieconsent";

const getConfig = () => {
  const config: CookieConsentConfig = {
    guiOptions: {
      consentModal: {
        layout: "box wide",
        position: "bottom left",
        equalWeightButtons: false,
        flipButtons: true,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: false,
        flipButtons: false,
      },
    },
    categories: {
      necessary: {
        readOnly: true,
      },
      functionality: {},
      analytics: {},
    },
    language: {
      default: "fr",
      translations: {
        fr: {
          consentModal: {
            title: "Nous utilisons des cookies",
            description:
              "Nous utilisons des cookies et d'autres technologies de suivi pour améliorer votre expérience de navigation sur notre site, pour vous montrer un contenu personnalisé et des publicités ciblées, pour analyser le trafic sur notre site et pour comprendre la provenance de nos visiteurs",
            acceptAllBtn: "Tout accepter",
            acceptNecessaryBtn: "Tout rejeter",
            showPreferencesBtn: "Gérer les préférences",
            footer:
              '<a href="#link">Politique de confidentialité</a>\n<a href="#link">Termes et conditions</a>',
          },
          preferencesModal: {
            title: "Préférences de cookies",
            acceptAllBtn: "Tout accepter",
            acceptNecessaryBtn: "Tout rejeter",
            savePreferencesBtn: "Sauvegarder les préférences",
            closeIconLabel: "Fermer la modale",
            serviceCounterLabel: "Services",
            sections: [
              {
                title: "Utilisation des Cookies",
                description:
                  "Nos cookies permettent d'améliorer votre expérience de navigation en vous offrant des contenus adaptés, et en analysant le trafic pour mieux comprendre l'usage de notre site.",
              },
              {
                title:
                  'Cookies Strictement Nécessaires <span class="pm__badge">Toujours Activé</span>',
                description:
                  "Ces cookies sont essentiels pour que le site fonctionne correctement. Ils permettent d'activer des fonctionnalités de base comme la sécurité, la gestion du réseau et l'accessibilité. Sans ces cookies, le site ne peut pas fonctionner correctement.",
                linkedCategory: "necessary",
              },
              {
                title: "Cookies de Fonctionnalités",
                description:
                  "Ces cookies permettent d'offrir des fonctionnalités supplémentaires et de personnaliser votre expérience, comme la mémorisation de vos préférences. Ils peuvent être définis par nous ou par des services tiers que nous avons ajoutés à nos pages.",
                linkedCategory: "functionality",
              },
              {
                title: "Cookies Analytiques",
                description:
                  "Ces cookies nous permettent de comprendre comment les visiteurs interagissent avec notre site. Ils aident à mesurer la performance des pages et à identifier les sections qui pourraient être améliorées. Toutes les informations collectées sont anonymes.",
                linkedCategory: "analytics",
              },
              {
                title: "Plus d'informations",
                description:
                  'Pour toute question concernant notre politique en matière de cookies et vos choix, veuillez <a class="cc__link" href="/contact">nous contacter</a>.',
              },
            ],
          },
        },
      },
      autoDetect: "browser",
    },
  };
  return config;
};

export default getConfig;
