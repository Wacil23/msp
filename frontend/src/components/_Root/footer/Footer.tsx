import { Button } from "@mantine/core";
import React from "react";
import { CiAt } from "react-icons/ci";
import { FiArrowUp } from "react-icons/fi";
import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-darker flex flex-col gap-5 px-36 py-12">
      <div className="flex justify-between items-center text-white font-semibold">
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
            size={45}
            className="rounded-full text-white p-3 bg-darkStroke"
          />
        </div>
      </div>
      <div className="flex items-center bg-darkStroke py-6  px-5 rounded-lg justify-between">
        <div className="flex gap-5">
          <Button
            variant="outline"
            style={{ color: "white", borderColor: "#2C5446" }}
            leftSection={<CiAt className="text-primary-300" />}
          >
            contact@mspdenain.fr
          </Button>
          <Button
            variant="outline"
            style={{ color: "white", borderColor: "#2C5446" }}
            leftSection={<PiPhoneBold className="text-primary-300" />}
          >
            0327067898
          </Button>
          <Button
            variant="outline"
            style={{ color: "white", borderColor: "#2C5446" }}
            leftSection={<PiMapPinBold className="text-primary-300" />}
          >
            156 rue Arthur Brunet, Denain 59220
          </Button>
          <Button
            variant="transparent"
            style={{ color: "white", borderColor: "#2C5446" }}
          >
            Devenir Membre
          </Button>
        </div>
        <p className="text-white font-bold">
          Copiright 2024 MSP denain. Tout droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
