"use client";
import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React from "react";
import { CiAt } from "react-icons/ci";
import { FiArrowUp } from "react-icons/fi";
import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";

const Footer = () => {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <footer className="bg-primary sticky bottom-0 z-0 flex flex-col gap-5 px-10 py-12 md:px-36 md:py-12">
      <div className="flex flex-col  gap-7 md:flex-row justify-between items-center text-darker font-semibold">
        <h2>LOGO</h2>
        <nav className="md:w-2/5">
          <ul className="flex flex-col gap-3 md:flex-row items-center justify-between">
            <li>Accueil</li>
            <li>Blog</li>
            <li>Qui sommes nous ?</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </nav>

        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftSection={<FiArrowUp />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Haut de page
              </Button>
            )}
          </Transition>
        </Affix>
      </div>
      <div className="flex flex-col md:flex-row items-center py-6  rounded-lg self-center">
        <div className="flex flex-col md:flex-row  gap-5">
          <Button
            variant="default"
            leftSection={<CiAt className="text-primary-900" />}
          >
            contact@mspdenain.fr
          </Button>
          <Button
            variant="default"
            leftSection={<PiPhoneBold className="text-primary-900" />}
          >
            0327067898
          </Button>
          <Button
            variant="default"
            leftSection={<PiMapPinBold className="text-primary-900" />}
          >
            170 rue Arthur Brunet, Denain 59220
          </Button>
          <Button variant="default">Devenir Membre</Button>
        </div>
      </div>
      <p className="text-darker text-center text-sm ">
        Copiright 2024 MSP denain. Tout droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
