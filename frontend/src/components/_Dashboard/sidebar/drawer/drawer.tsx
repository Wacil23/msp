"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { links } from "@/src/utils/data/dummy";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "@mantine/core";
import Link from "next/link";

interface DrawerPorps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  pathname: string;
}

const Drawer: React.FC<DrawerPorps> = ({
  setSidebarOpen,
  sidebarOpen,
  pathname,
}) => {
  return (
    <Dialog
      className="relative z-50 lg:hidden"
      open={sidebarOpen}
      onClose={setSidebarOpen}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <TransitionChild>
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <IoCloseCircleOutline
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </TransitionChild>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  {links.map((item) => (
                    <>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        {item.title}
                      </div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {item.links.map((link) => (
                          <li key={link.name}>
                            <NavLink
                              component={Link}
                              href={`/dashboard/${link.url}`}
                              leftSection={link.icon}
                              className={`rounded-md text-xl capitalize hover:bg-[#0e0e0e0d] active:font-bold`}
                              label={link.name}
                              color="darker.1"
                              active={link.current(link.url, pathname)}
                            ></NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ))}
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <CiSettings
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Paramètres
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Drawer;
