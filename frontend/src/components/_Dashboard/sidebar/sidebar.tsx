import React from "react";

const Sidebar = () => {
  return (
    <nav className="p-5 flex flex-col gap-16 bg-gray-600 h-dvh w-64">
      <h1>Logo</h1>
      <ul className="flex flex-col gap-8">
        <li>Acceuil</li>
        <li>Chat</li>
        <li>Rendez-vous</li>
        <li>Membres</li>
        <li>Paramètres</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
