import React from "react";
import { Divider } from "@mantine/core";
import { CgDanger, CgCheckO } from "react-icons/cg";
import { CiWarning } from "react-icons/ci";

export enum SnackType {
  Danger,
  Warning,
  Success,
}

type SnackBarProps = {
  type: SnackType;
  title: string;
  message: string;
};

const iconMap = {
  [SnackType.Danger]: <CgDanger className="text-red-500" size={25} />,
  [SnackType.Warning]: <CiWarning className="text-yellow-500" size={25} />,
  [SnackType.Success]: <CgCheckO className="text-green-500" size={25} />,
};

const styleMap = {
  [SnackType.Danger]: "bg-red-100 border-red-500",
  [SnackType.Warning]: "bg-yellow-100 border-yellow-500",
  [SnackType.Success]: "bg-green-100 border-green-500",
};

const SnackBar: React.FC<SnackBarProps> = ({ type, title, message }) => {
  // Récupère les classes de style spécifiques basées sur le type
  const styleClasses = styleMap[type];

  return (
    <div
      className={`flex items-center rounded-sm border p-3 gap-5 ${styleClasses}`}
    >
      {iconMap[type]}
      <Divider
        orientation="vertical"
        color={
          type === SnackType.Danger
            ? "red"
            : type === SnackType.Warning
            ? "yellow"
            : "green"
        }
      />
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SnackBar;
