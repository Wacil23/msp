import { getAllUsers } from "@/src/lib/services/users/Users";
import { UserSession } from "@/types/next-auth";
import React from "react";

const Membres = async ({ user }: { user: UserSession }) => {
  console.log("hello", user);
  const users = await getAllUsers(user?.access_token);
  return (
    <div className="m-12 p-12 w-full bg-slate-200">
      <div className="">
        <h1>Membres de la MSP</h1>
        {users.map((user) => (
          <>{user}</>
        ))}
      </div>
    </div>
  );
};

export default Membres;
