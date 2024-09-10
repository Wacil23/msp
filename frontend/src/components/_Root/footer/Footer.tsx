"use client";
import {
  Affix,
  Button,
  Divider,
  TextInput,
  ThemeIcon,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { CiAt } from "react-icons/ci";
import { FiArrowUp } from "react-icons/fi";
import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";
import { ShareButtons } from "../../_UI/ShareButtons/ShareButtons";

const Footer = () => {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <footer className="flex flex-col gap-2 bg-primary px-10 py-12 md:gap-5 md:py-12 lg:px-36">
      <div className="flex w-full flex-col justify-between gap-10 md:flex-row md:gap-5">
        <div className="flex flex-col items-center gap-14 text-darker md:flex-row md:gap-20 lg:w-1/2">
          <h2>LOGO</h2>
          <div className="flex w-full flex-col gap-5 md:flex-row md:gap-5">
            <nav className="flex w-full flex-col gap-2 md:gap-5">
              <p className="font-semibold">Pages</p>
              <ul className="flex flex-col justify-between gap-1 font-medium md:gap-3">
                <li>
                  <Link className="transition-all hover:underline" href="/">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link className="transition-all hover:underline" href="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-all hover:underline"
                    href="/qui-sommes-nous"
                  >
                    Qui sommes nous ?
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-all hover:underline"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="transition-all hover:underline" href="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="flex w-full flex-col gap-5">
              <p className="font-semibold">Informations</p>
              <ul className="flex flex-col justify-between gap-3 font-medium lg:text-nowrap">
                <li className="flex items-center gap-2">
                  <a href="mailto:contact@mspdenain.fr">contact@mspdenain.fr</a>
                </li>
                <li className="flex items-center gap-2">
                  <a href="tel:0327067898">03 27 06 78 98</a>
                </li>
                <li className="flex items-center gap-2">
                  <a href="https://www.google.com/maps/place/570+Rue+Arthur+Brunet,+59220+Denain/@50.436785,3.366884,17z/data=!3m1!4b1!4m6!3m5!1s0x47c2e70000000001:0x100000000000000!8m2!3m1!1s0x47c2e70000000001:0x100000000000000!16s%2Fg%2F11c255550y?entry=ttu">
                    570 rue Arthur Brunet, Denain 59220
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:w-1/3">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">S'inscrire à la newsletter</p>
            <p>
              Nous vous informerons de nos dernières actualités et de nos
              événements.
            </p>
          </div>
          <form className="flex gap-4">
            <TextInput
              type="email"
              className="w-full lg:w-3/5"
              placeholder="Email"
            />
            <Button variant="default">S'inscrire</Button>
          </form>
        </div>
      </div>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ThemeIcon
              onClick={() => scrollTo({ y: 0 })}
              color="primary"
              size="xl"
              radius="xl"
            >
              <FiArrowUp />
            </ThemeIcon>
          )}
        </Transition>
      </Affix>
      <Divider my="md" />
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <p className="text-sm text-darker">
          Copiright 2024 MSP denain. Tout droits réservés.
        </p>
        <div className="flex flex-col items-center gap-5 text-sm text-darker lg:flex-row">
          <p>Suivez-nous sur</p>
          <div className="flex gap-5">
            <ShareButtons />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
