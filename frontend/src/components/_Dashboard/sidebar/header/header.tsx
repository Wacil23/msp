import React from "react";
import { BsBell } from "react-icons/bs";
import { CgChevronDown, CgMenuRight } from "react-icons/cg";
import { Avatar } from "@mantine/core";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

interface HeaderSidebar {
  setSidebarOpen: (value: boolean) => void;
  children: React.ReactNode;
}
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
type UserNav = {
  name: string;
  href?: string;
  onclick?: () => void;
};

const HeaderSidebar: React.FC<HeaderSidebar> = ({
  setSidebarOpen,
  children,
}) => {
  const { data: user } = useSession();
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS;
  const userNavigation = [
    { name: "Paramètres", href: "/dashboard/parametres" },
  ];
  return (
    <div className="lg:pl-72">
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <CgMenuRight className="h-6 w-6 text-darker" aria-hidden="true" />
        </button>
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BsBell className="h-6 w-6" aria-hidden="true" />
            </button>
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              aria-hidden="true"
            />
            <Menu as="div" className="relative">
              <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Avatar
                  size={"2rem"}
                  src={user?.user.avatar && directusUrl + user.user.avatar}
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    {user?.user.name}
                  </span>
                  <CgChevronDown
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-full origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    {({}) => (
                      <div className="flex flex-col gap-1 p-2">
                        <a
                          href={item.href}
                          className={classNames(
                            "block rounded-md px-3 py-2 text-sm leading-6 text-gray-900",
                          )}
                        >
                          {item.name}
                        </a>
                        <p
                          className="cursor-pointer rounded-md bg-red-300 px-3 py-2 text-sm font-medium text-red-950 hover:bg-red-500"
                          onClick={() => signOut()}
                        >
                          Se déconnecter
                        </p>
                      </div>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <main className="w-full text-darker">{children}</main>
    </div>
  );
};

export default HeaderSidebar;
