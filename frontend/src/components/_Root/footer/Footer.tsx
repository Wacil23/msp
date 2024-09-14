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
import { FiArrowUp } from "react-icons/fi";
import { ShareButtons } from "../../_UI/ShareButtons/ShareButtons";
import { usePathname } from "next/navigation";
import { navMenu } from "../header/header";

const Footer = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const pathname = usePathname();
  return (
    <footer className="flex flex-col gap-2 bg-primary px-10 py-12 md:gap-5 md:py-12 lg:px-36">
      <div className="flex w-full flex-col justify-between gap-10 md:flex-row md:gap-5 lg:gap-8">
        <div className="flex flex-col items-center gap-14 text-darker md:flex-row md:gap-20 lg:w-1/2">
          <h2>LOGO</h2>
          <div className="flex w-full flex-col gap-8 md:flex-row md:gap-12">
            <nav className="flex w-full flex-col gap-2 md:gap-5">
              <p className="font-bold">Pages</p>
              <ul className="flex flex-col justify-between gap-1 font-normal md:gap-1">
                <li>
                  <Link
                    className={`${pathname === "/" ? "font-semibold underline" : ""} 'transition-all capitalize hover:underline`}
                    href="/"
                  >
                    Accueil
                  </Link>
                </li>
                {navMenu.map((nav) => (
                  <li>
                    <Link
                      className={`${pathname === nav.href ? "font-bold underline" : ""} 'transition-all capitalize hover:underline`}
                      href={nav.href}
                    >
                      {nav.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="flex w-full flex-col gap-2">
              <p className="font-bold">Informations</p>
              <ul className="flex flex-col justify-between gap-2 font-normal lg:text-nowrap">
                <li>
                  <a href="mailto:contact@mspdenain.fr">contact@mspdenain.fr</a>
                </li>
                <li>
                  <a href="tel:0327067898">03 27 06 78 98</a>
                </li>
                <li>
                  <a href="https://www.google.com/maps/place/570+Rue+Arthur+Brunet,+59220+Denain/@50.436785,3.366884,17z/data=!3m1!4b1!4m6!3m5!1s0x47c2e70000000001:0x100000000000000!8m2!3m1!1s0x47c2e70000000001:0x100000000000000!16s%2Fg%2F11c255550y?entry=ttu">
                    570 rue Arthur Brunet, Denain 59220
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 lg:w-1/3">
          <div className="flex flex-col gap-2">
            <p className="font-bold">S'inscrire à la newsletter</p>
            <p className="font-normal">
              Nous vous informerons de nos dernières actualités et de nos
              événements.
            </p>
          </div>
          <form className="flex flex-col gap-4">
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
          {() => (
            <ThemeIcon
              onClick={() => scrollTo({ y: 0 })}
              color="primary"
              size="xl"
              radius="xl"
            >
              <FiArrowUp className="text-darker" />
            </ThemeIcon>
          )}
        </Transition>
      </Affix>
      <Divider my="md" />
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <p className="text-sm text-darker">
          Copyright 2024 MSP denain. Tout droits réservés.
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
