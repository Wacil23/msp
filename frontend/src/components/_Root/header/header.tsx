"use client";
import { UserAuthenticated } from "@/types/next-auth";
import { Button, Drawer, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FiHome,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import MenuUI, { MenuItem } from "../../_UI/Menu/Menu";
import { signOut } from "next-auth/react";

type MenuDrawerProps = {
  opened: boolean;
  onClose: () => void;
  user: UserAuthenticated;
};

const navMenu = [
  {
    label: "Accueil",
    href: "/",
    isActive: false,
  },
  {
    label: "Blog",
    href: "/blog",
    isActive: false,
  },
  {
    label: "Qui sommes nous ?",
    href: "/qui-sommes-nous",
    isActive: false,
  },
  {
    label: "contact",
    href: "/contact",
    isActive: false,
  },
  {
    label: "faq",
    href: "/faq",
    isActive: false,
  },
];

const menuItems: MenuItem[] = [
  {
    icon: FiHome,
    label: "Accueil",
    href: "/dashboard/",
    component: Link,
  },
  {
    icon: FiMessageCircle,
    label: "Messages",
    href: "/dashboard/chat",
    component: Link,
  },
  {
    icon: FiSettings,
    label: "Paramètres",
    href: "/dashboard/parametre",
    component: Link,
  },
  {
    icon: FiLogOut,
    label: "Se déconnecter",
    action: signOut,
    color: "red",
  },
];

const Header = ({ user }: { user: UserAuthenticated }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  return (
    <>
      <div className="bg-primary px-6 py-3">
        <nav>
          <ul>
            <li>TEL</li>
          </ul>
        </nav>
      </div>
      <header className="will-change-scroll z-50  px-8 md:px-24 sticky bg-main top-0 w-full py-5 flex justify-between items-center gap-5">
        <nav className="flex w-full items-center justify-between">
          <Title
            order={1}
            size={"1rem"}
            className="font-semibold text-darker text-center"
          >
            LOGO
          </Title>
          <ul className="hidden text-darker lg:flex lg:gap-12 ">
            {navMenu.map((menu) => (
              <li>
                <Link
                  className={`capitalize ${
                    menu.isActive ? "font-semibold" : "font-medium"
                  }`}
                  href={menu.href}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="hidden lg:flex">
            <li>
              {user ? (
                <MenuUI menuItems={menuItems} name={user.name} key={user.id} />
              ) : (
                <Button component={Link} bg={""} href={"/connexion"}>
                  Connexion
                </Button>
              )}
            </li>
          </ul>
        </nav>
        <FiMenu
          onClick={open}
          size={35}
          className="text-primary-700 cursor-pointer lg:hidden"
        />
      </header>
      <MenuDrawer opened={opened} user={user} onClose={close} />
    </>
  );
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({ opened, onClose, user }) => {
  const links = [
    { title: "Accueil", href: "/" },
    { title: "Qui sommes nous ?", href: "/qui-sommes-nous" },
    { title: "Blog", href: "/blog" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => onClose();
  const router = useRouter();
  return (
    <>
      <Drawer.Root
        position="right"
        size={"xs"}
        opened={opened}
        onClose={onClose}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body className=" h-full flex bg-gray-100 flex-col px-5">
            <Drawer.CloseButton c={"primary.9"} size={35} />
            <ul className="flex flex-col gap-5 items-center h-full justify-center">
              {links.map((link) => (
                <li key={link.title}>
                  <Link
                    onClick={handleLinkClick}
                    className="group text-2xl text-neutral-800 text-justify transition duration-300 font-light"
                    href={link.href}
                  >
                    {link.title}
                    <span className="block max-w-0 group-hover:max-w-full bg-primary transition-all h-0.5"></span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    size="md"
                    fw={700}
                    leftSection={<FiUser />}
                  >
                    Devenir adhérent
                  </Button>
                  <Button
                    size="md"
                    fw={700}
                    variant="filled"
                    leftSection={<FiLogIn />}
                    bg={"primary.3"}
                    onClick={() => router.push("/connexion")}
                  >
                    Se connecter
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="md"
                    fw={700}
                    variant="filled"
                    leftSection={<FiLogIn />}
                    bg={"primary.6"}
                    onClick={() => router.push("/dashboard")}
                  >
                    Mon espace membre
                  </Button>
                </>
              )}
            </ul>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default Header;
