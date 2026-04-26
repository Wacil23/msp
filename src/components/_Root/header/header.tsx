"use client";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { CONTACT, DOCTOLIB_URL } from "@/src/lib/data/site";

export interface NavigationMenu {
  label: string;
  href: string;
}

export const navMenu: NavigationMenu[] = [
  { label: "Accueil", href: "/" },
  { label: "Équipe", href: "/qui-sommes-nous" },
  { label: "Conseils santé", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const isActive = (href: string, pathname: string | null) =>
  href === "/" ? pathname === "/" : (pathname?.startsWith(href) ?? false);

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <Link
    href="/"
    onClick={onClick}
    aria-label="Pôle Santé du Denaisis — Accueil"
    className="flex items-center gap-2.5 text-darker"
  >
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
);

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/80 bg-main/90 backdrop-blur supports-[backdrop-filter]:bg-main/80">
        <div className="container-msp flex h-16 items-center justify-between md:h-[68px]">
          <Logo />
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navMenu.map((menu) => {
              const active = isActive(menu.href, pathname);
              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-light text-forest"
                      : "text-ink-2 hover:text-darker"
                  }`}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-main px-3 py-1.5 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest"
            >
              <FiPhone size={12} />
              {CONTACT.phone}
            </a>
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-cream shadow-sage transition-colors hover:bg-forest"
            >
              Rendez-vous
            </a>
          </div>
          <button
            type="button"
            onClick={open}
            aria-label="Ouvrir le menu"
            className="rounded-md border border-line bg-main p-1.5 text-darker lg:hidden"
          >
            <CgMenuRightAlt size={20} />
          </button>
        </div>
      </header>
      <MenuDrawer opened={opened} onClose={close} pathname={pathname} />
    </>
  );
};

type MenuDrawerProps = {
  opened: boolean;
  onClose: () => void;
  pathname: string | null;
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  opened,
  onClose,
  pathname,
}) => {
  return (
    <Drawer.Root
      position="right"
      size="xs"
      opened={opened}
      onClose={onClose}
      transitionProps={{ transition: "slide-left", duration: 220 }}
    >
      <Drawer.Overlay color="#0E1311" backgroundOpacity={0.35} />
      <Drawer.Content style={{ background: "#FFFFFF" }}>
        <Drawer.Body className="flex h-full flex-col px-5 py-5">
          <div className="flex items-center justify-between">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="rounded-md border border-line bg-main p-1.5 text-darker"
            >
              <CgClose size={18} />
            </button>
          </div>
          <ul className="mt-8 flex flex-col gap-1.5">
            {navMenu.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    onClick={onClose}
                    href={link.href}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "border-secondary bg-light text-forest"
                        : "border-line bg-main text-darker hover:border-secondary/40"
                    }`}
                  >
                    {link.label}
                    <span aria-hidden className="text-ink-3">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col gap-2 border-t border-line pt-5">
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-secondary px-4 py-3 text-center text-sm font-medium text-cream shadow-sage"
            >
              Prendre rendez-vous
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-main px-4 py-3 text-sm font-medium text-darker"
            >
              <FiPhone size={14} />
              {CONTACT.phone}
            </a>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default Header;
