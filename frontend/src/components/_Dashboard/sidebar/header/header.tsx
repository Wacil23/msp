import React from "react";
import { BsBell } from "react-icons/bs";
import { CgChevronDown, CgMenuRight } from "react-icons/cg";
import { Avatar, Indicator } from "@mantine/core";
import { Menu } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useUnreadMessages } from "@/src/lib/providers/useMessagesUnreadContext";
import { Notifications } from "@mantine/notifications";

interface HeaderSidebar {
  setSidebarOpen: (value: boolean) => void;
  children: React.ReactNode;
}
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const HeaderSidebar: React.FC<HeaderSidebar> = ({
  setSidebarOpen,
  children,
}) => {
  const { data: user } = useSession();
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS;
  const userNavigation = [
    { name: "Paramètres", href: "/dashboard/parametres" },
  ];
  const { unreadMessages } = useUnreadMessages();

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
            <span className="sr-only">View notifications</span>
            <Menu shadow="md" width={300}>
              <Menu.Target>
                <Indicator
                  disabled={unreadMessages.length === 0}
                  inline
                  processing
                  className=""
                  color="red"
                  size={12}
                >
                  <BsBell className="h-6 w-6" aria-hidden="true" />
                </Indicator>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Notifications</Menu.Label>
                {unreadMessages.map((message) => {
                  console.log(message);
                  return (
                    <Menu.Item>
                      <div className="flex">
                        <p>
                          {message.user_created.last_name}{" "}
                          {message.user_created.first_name}
                          {" : "}
                        </p>
                        <p> {message.text}</p>
                      </div>
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              aria-hidden="true"
            />
            <Menu>
              <Menu.Target>
                <Avatar
                  size={"2rem"}
                  src={user?.user.avatar && directusUrl + user.user.avatar}
                />
              </Menu.Target>
              <Menu.Dropdown className="absolute right-0 z-10 mt-2.5 w-full origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
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
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
      <main className="w-full text-darker">{children}</main>
    </div>
  );
};

export default HeaderSidebar;
