"use client";
import { getAllUsers, getMembersUsers } from "@/src/lib/services/users/Users";
import { UserSession } from "@/types/next-auth";
import { DirectusUser } from "@directus/sdk";
import { Avatar, Skeleton } from "@mantine/core";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const Membres = () => {
  const { data: session, status } = useSession();
  const token = session?.acess_token;
  const getInital = (user: DirectusUser<UserSession>) => {
    const firstLetter = user.first_name?.at(0);
    const lastLetter = user.last_name?.at(0);
    return `${firstLetter}${lastLetter}`;
  };

  const fetcher = () => (token ? getMembersUsers(token) : null);
  const { data: users, error } = useSWR(token ? "users/" : null, fetcher);

  if (status === "unauthenticated")
    return <div>Vous avez été déconnecté...</div>;

  if (error)
    return (
      <div className="grid place-items-center place-content-center">
        Oops ... Il semble qu'il y a eu un petit problème veuillez réessayer
      </div>
    );
  if (!users)
    return (
      <Skeleton className="m-10" animate>
        <div className="p-12  rounded-md bg-primary/55 h-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-extrabold text-2xl">Paramètres</h1>
              <h2>Modifiez vos paramètres de compte</h2>
            </div>
          </div>
          <div className="py-12 flex gap-8 h-full">
            <div className="flex flex-col gap-3 items-center"></div>
          </div>
        </div>
      </Skeleton>
    );

  return (
    <div className="p-12 w-full">
      <div className="p-12 rounded-md bg-primary/55">
        <h1 className="font-bold text-2xl">Membres de la MSP</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 p-20 gap-y-6">
          {users?.map((user) => (
            <div key={user.id} className="p-4 ">
              <div className="flex items-center gap-2">
                <Avatar>{getInital(user)}</Avatar>
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membres;
