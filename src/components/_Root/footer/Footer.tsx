"use client";
import { Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import Link from "next/link";
import { FiArrowUp, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { CONTACT, DOCTOLIB_URL, SITE } from "@/src/lib/data/site";
import { navMenu } from "../header/header";

const Footer = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-main">
      <div className="container-msp grid gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-light">
              <span className="block h-2 w-2 rounded-sm bg-secondary" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xs font-semibold tracking-tight text-darker">
                Pôle Santé du Denaisis
              </span>
              <span className="mt-0.5 text-2xs font-medium text-ink-2">
                MSP · Denain
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-ink-2 md:text-sm">
            {SITE.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-cream shadow-sage transition-colors hover:bg-forest"
            >
              Prendre rendez-vous
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-main px-3 py-1.5 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest"
            >
              <FiPhone size={12} />
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-3">Navigation</p>
          <ul className="flex flex-col gap-1.5 text-xs md:text-sm">
            {navMenu.map((nav) => (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  className="text-ink-2 transition-colors hover:text-forest"
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Contact</p>
          <ul className="flex flex-col gap-2.5 text-xs md:text-sm">
            <li>
              <a
                href={CONTACT.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-ink-2 hover:text-forest"
              >
                <FiMapPin className="mt-0.5 shrink-0" size={13} />
                {CONTACT.address}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 text-ink-2 hover:text-forest"
              >
                <FiPhone size={13} />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.emailHref}
                className="inline-flex items-center gap-2 text-ink-2 hover:text-forest"
              >
                <FiMail size={13} />
                {CONTACT.email}
              </a>
            </li>
            <li className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-line pt-3 text-2xs text-ink-2 md:text-xs">
              {CONTACT.hours.map((h) => (
                <div key={h.day} className="contents">
                  <span>{h.day}</span>
                  <span className="text-right text-darker">{h.time}</span>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-msp flex flex-col items-start justify-between gap-2 py-5 text-2xs text-ink-2 md:flex-row md:items-center md:text-xs">
          <p>
            © {year} {SITE.shortName}. Tous droits réservés.
          </p>
          <p>
            Sans valeur médicale — urgence vitale&nbsp;:{" "}
            <a href="tel:15" className="font-semibold text-forest">
              15
            </a>
          </p>
        </div>
      </div>

      <Affix position={{ bottom: 16, right: 16 }}>
        <Transition transition="slide-up" mounted={scroll.y > 200}>
          {(transitionStyles) => (
            <button
              type="button"
              onClick={() => scrollTo({ y: 0 })}
              aria-label="Retour en haut"
              style={transitionStyles}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-main text-darker shadow-soft transition-colors hover:border-secondary hover:bg-secondary hover:text-cream"
            >
              <FiArrowUp size={16} />
            </button>
          )}
        </Transition>
      </Affix>
    </footer>
  );
};

export default Footer;
