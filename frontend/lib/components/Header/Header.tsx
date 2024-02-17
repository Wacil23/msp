"use client";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Center,
  Drawer,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { FiLogIn, FiMenu, FiPhoneCall, FiUser } from "react-icons/fi";

type MenuDrawerProps = {
  opened: boolean;
  onClose: () => void;
};

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <header className="will-change-scroll z-50 px-5 sticky top-0 w-full bg-white py-5 flex justify-between items-center gap-5 border-b shadow-sm">
        <FiMenu
          onClick={open}
          size={35}
          className="text-primary-700 cursor-pointer"
        />
        <nav className="flex">
          <Title
            order={1}
            size={"1rem"}
            className="font-bold text-primary-700 text-center"
          >
            Maison de Santé <br />
            Pluridisciplinaire de Denain
          </Title>
          <ul className="hidden">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <ul className="hidden">
            <li>
              <Link href="/connexion">
                <Button>Connexion</Button>
              </Link>
            </li>
          </ul>
        </nav>
        <ActionIcon variant="outline" size={"md"} color="primary.7">
          <FiPhoneCall />
        </ActionIcon>
      </header>
      <MenuDrawer opened={opened} onClose={close} />
    </>
  );
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({ opened, onClose }) => {
  const links = [
    { title: "Accueil", href: "/" },
    { title: "Qui sommes nous ?", href: "/connexion" },
    { title: "Blog", href: "/dashboard" },
    { title: "FAQ", href: "/dashboard" },
    { title: "Contact", href: "/dashboard" },
  ];

  const handleLinkClick = () => onClose();

  return (
    <>
      <Drawer.Root size={"xs"} opened={opened} onClose={onClose}>
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
                    <span className="block max-w-0 group-hover:max-w-full bg-primary-900 transition-all h-0.5"></span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
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
              >
                Se connecter
              </Button>
            </ul>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default Header;
