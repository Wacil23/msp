"use client";
import { UserAuthenticated } from "@/types/next-auth";
import { Avatar, Button, Drawer, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLogIn, FiMenu, FiUser } from "react-icons/fi";

type MenuDrawerProps = {
  opened: boolean;
  onClose: () => void;
  user: UserAuthenticated;
};

const Header = ({ user }: { user: UserAuthenticated }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const initial = user?.name
    ?.split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
  return (
    <>
      <div className="bg-primary-300 px-6 py-3">
        <nav>
          <ul>
            <li>TEL</li>
          </ul>
        </nav>
      </div>
      <header className="will-change-scroll z-50 px-36 sticky bg-main top-0 w-full  py-5 flex justify-between items-center gap-5">
        <nav className="flex w-full items-center justify-between">
          <Title
            order={1}
            size={"1rem"}
            className="font-bold text-darker text-center"
          >
            LOGO
          </Title>
          <ul className="hidden text-darker lg:flex lg:gap-12 lg:font-semibold">
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/dashboard">Qui sommes nous ?</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/dashboard">FAQ</Link>
            </li>
          </ul>
          <ul className="hidden lg:flex">
            <li>
              {user ? (
                <div className="flex items-center gap-3">
                  <Avatar
                    className="cursor-pointer"
                    radius="xl"
                    size="lg"
                    color="green"
                  >
                    {initial}
                  </Avatar>
                  <Button onClick={() => signOut()} color="red">
                    Se déconnecter
                  </Button>
                </div>
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
    { title: "Qui sommes nous ?", href: "/connexion" },
    { title: "Blog", href: "/blog" },
    { title: "FAQ", href: "/dashboard" },
    { title: "Contact", href: "/dashboard" },
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
                    <span className="block max-w-0 group-hover:max-w-full bg-primary-300 transition-all h-0.5"></span>
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
