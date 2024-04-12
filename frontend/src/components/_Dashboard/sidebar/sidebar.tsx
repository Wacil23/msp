"use client";
import { Burger, NavLink } from "@mantine/core";
import React from "react";
import { links } from "@/src/utils/data/dummy";
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = React.useState("accueil");
  console.log(active);
  return (
    <>
      <nav className="px-5 py-8 flex flex-col gap-2 bg-primary-300 h-dvh w-60 relative">
        <Burger className="absolute right-4" />
        <ul className="flex flex-col gap-8 mt-8">
          {links.map((item) => (
            <div key={item.title}>
              <p className="text-gray-800 m-3 mt-4 text-sm uppercase">
                {item.title}
              </p>
              {item.links.map((link) => {
                return (
                  <NavLink
                    component={Link}
                    key={link.name}
                    href={`/dashboard/${link.url}`}
                    onClick={() => setActive(link.name)}
                    label={link.name}
                    className="capitalize text-xl active:font-bold hover:bg-[#0e0e0e0d] rounded-md"
                    color="#0000002e"
                    leftSection={link.icon}
                    active={link.name === active}
                    variant="filled"
                  ></NavLink>
                );
              })}
            </div>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
