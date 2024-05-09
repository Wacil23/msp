"use client";
import { Burger, Button, NavLink } from "@mantine/core";
import React, { useState } from "react";
import { links } from "@/src/utils/data/dummy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname().replace("/dashboard", "");

  return (
    <>
      <nav
        className={`px-5 flex flex-col gap-2 bg-secondary min-h-dvh ${
          isCollapsed ? "w-20" : "w-60"
        } relative`}
      >
        <Burger
          className="absolute right-4"
          opened={!isCollapsed}
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
        <ul
          className={`flex flex-col gap-8 mt-8 ${
            isCollapsed ? "items-start" : ""
          }`}
        >
          {links.map((item) => (
            <div key={item.title}>
              {!isCollapsed && (
                <p className="text-gray-800 m-3 mt-4 text-sm uppercase">
                  {item.title}
                </p>
              )}
              {item.links.map((link) => {
                return (
                  <NavLink
                    component={Link}
                    key={link.name}
                    href={`/dashboard/${link.url}`}
                    label={isCollapsed ? "" : link.name}
                    className={`capitalize text-xl active:font-bold hover:bg-[#0e0e0e0d] rounded-md ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                    color="#0000002e"
                    leftSection={link.icon}
                    active={
                      link.url == "/"
                        ? link.url.replace("/", "") === pathname
                        : "/" + link.url === pathname
                    }
                    variant="filled"
                  ></NavLink>
                );
              })}
            </div>
          ))}
          {!isCollapsed ? (
            <Button
              leftSection={<FiLogOut />}
              onClick={() => signOut()}
              color="red"
            >
              Déconnexion
            </Button>
          ) : (
            <FiLogOut className="cursor-pointer" onClick={() => signOut()} />
          )}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
