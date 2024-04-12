import React from "react";
import {
  FiHome,
  FiMessageCircle,
  FiSettings,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
export const links = [
  {
    title: "Dashboard",
    links: [
      {
        url: "/",
        name: "accueil",
        icon: <FiHome />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        url: "reunion",
        name: "Réunions",
        icon: <FiCalendar />,
      },
      {
        url: "membres",
        name: "Membres",
        icon: <FiUsers />,
      },
      {
        url: "chat",
        name: "Chat",
        icon: <FiMessageCircle />,
      },
    ],
  },
  {
    title: "Paramètres",
    links: [
      {
        url: "parametres",
        name: "paramètres",
        icon: <FiSettings />,
      },
    ],
  },
];
