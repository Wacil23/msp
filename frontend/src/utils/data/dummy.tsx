import React from "react";
import { FiHome, FiMessageCircle, FiUsers, FiCalendar } from "react-icons/fi";
export const links = [
  {
    title: "Dashboard",
    links: [
      {
        url: "/",
        name: "Accueil",
        icon: <FiHome />,
        current: (url: string, pathname: string) =>
          url == "/"
            ? url.replace("/", "") === pathname
            : "/" + url === pathname,
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
        current: (url: string, pathname: string) =>
          url == "/"
            ? url.replace("/", "") === pathname
            : "/" + url === pathname,
      },
      {
        url: "membres",
        name: "Membres",
        icon: <FiUsers />,
        current: (url: string, pathname: string) =>
          url == "/"
            ? url.replace("/", "") === pathname
            : "/" + url === pathname,
      },
      {
        url: "chat",
        name: "Chat",
        icon: <FiMessageCircle />,
        current: (url: string, pathname: string) =>
          url == "/"
            ? url.replace("/", "") === pathname
            : "/" + url === pathname,
      },
    ],
  },
];
