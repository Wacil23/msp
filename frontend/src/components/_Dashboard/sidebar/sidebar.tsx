"use client";

import React, { useState } from "react";
import { links } from "@/src/utils/data/dummy";
import { usePathname } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import Drawer from "./drawer/drawer";
import HeaderSidebar from "./header/header";

const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname().replace("/dashboard", "");
  return (
    <>
      <div>
        <Drawer
          pathname={pathname}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-7">
                <li>
                  {links.map((item) => (
                    <div key={item.title} className="flex flex-col gap-1">
                      <div className="mt-2 text-xs font-semibold leading-6 text-gray-900">
                        {item.title}
                      </div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {item.links.map((link) => (
                          <NavLink
                            key={link.name}
                            component={Link}
                            href={`/dashboard/${link.url}`}
                            leftSection={link.icon}
                            className={`rounded-md text-xl capitalize hover:bg-[#0e0e0e0d] active:font-bold`}
                            label={link.name}
                            color="darker.1"
                            active={link.current(link.url, pathname)}
                          ></NavLink>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
                <NavLink
                  component={Link}
                  href={`/dashboard/parametres`}
                  leftSection={<CiSettings className="h-6 w-6" />}
                  className="-mx-2 mt-auto flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-[#0e0e0e0d]"
                  active={pathname === "/parametres"}
                  label="Paramètres"
                  color="darker.1"
                ></NavLink>
              </ul>
            </nav>
          </div>
        </div>
        <HeaderSidebar
          children={children}
          setSidebarOpen={() => setSidebarOpen(true)}
        />
      </div>
    </>
  );
};

export default Sidebar;
