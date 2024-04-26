import { Button } from "@mantine/core";
import React from "react";
import { CiAt } from "react-icons/ci";
import { FiArrowUp } from "react-icons/fi";
import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-primary sticky bottom-0 -z-10 flex flex-col gap-5 px-36 py-12">
      <div className="flex justify-between items-center text-darker font-semibold">
        <h2>LOGO</h2>
        <nav className="w-2/5">
          <ul className="flex items-center justify-between">
            <li>Accueil</li>
            <li>Blog</li>
            <li>Qui sommes nous ?</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </nav>
        <div className="flex items-center gap-5">
          <p>Haut de page</p>
          <FiArrowUp
            size={35}
            className="rounded-full text-darker p-3 bg-primary-900"
          />
        </div>
      </div>
      <div className="flex items-center py-6  px-5 rounded-lg justify-between">
        <div className="flex gap-5">
          <Button
            variant="outline"
            style={{ color: "white", borderColor: "#6f9700" }}
            leftSection={<CiAt className="text-primary-900" />}
          >
            contact@mspdenain.fr
          </Button>
          <Button
            variant="outline"
            style={{ color: "white", borderColor: "#6f9700" }}
            leftSection={<PiPhoneBold className="text-primary-900" />}
          >
            0327067898
          </Button>
          <Button
            variant="outline"
            style={{ color: "white", borderColor: "#6f9700" }}
            leftSection={<PiMapPinBold className="text-primary-900" />}
          >
            156 rue Arthur Brunet, Denain 59220
          </Button>
          <Button
            variant="transparent"
            style={{ color: "white", borderColor: "#6f9700" }}
          >
            Devenir Membre
          </Button>
        </div>
        <p className="text-darker font-bold">
          Copiright 2024 MSP denain. Tout droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
