import { Menu, Avatar } from "@mantine/core";
import React from "react";
import { IconType } from "react-icons/lib";

export interface MenuItem {
  icon: IconType;
  label: string;
  href?: string;
  component?: any;
  action?: () => void;
  color?: string;
}

interface MenuUIProps {
  menuItems: MenuItem[];
  name?: string;
  target?: React.ReactNode;
}

const MenuUI: React.FC<MenuUIProps> = ({ menuItems, name, target }) => {
  name = name
    ?.split(" ")
    .map((part: any) => part[0].toUpperCase())
    .join("");

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {name ? (
          <Avatar
            className="cursor-pointer"
            radius="xl"
            variant="filled"
            size={45}
            color="primary.3"
          >
            {name}
          </Avatar>
        ) : (
          target
        )}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label style={{ fontSize: 14 }}>Espace membres</Menu.Label>
        {menuItems.map((item, index) => {
          if (item.component && item.href) {
            return (
              <Menu.Item
                key={index}
                leftSection={<item.icon style={{ width: 14, height: 14 }} />}
                component={item.component}
                href={item.href}
                color={item.color}
              >
                {item.label}
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item
                key={index}
                leftSection={<item.icon style={{ width: 14, height: 14 }} />}
                onClick={item.action}
                color={item.color}
              >
                {item.label}
              </Menu.Item>
            );
          }
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
export default MenuUI;
