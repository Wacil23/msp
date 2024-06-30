"use client";
import { getMembersUsers } from "@/src/lib/services/users/Users";
import { UserSession } from "@/types/next-auth";
import { Avatar, Skeleton } from "@mantine/core";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const Membres = () => {
  const { data: session, status } = useSession();
  const token = session?.acess_token;
  const getInital = (user: UserSession) => {
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
      <div className="grid place-content-center place-items-center">
        Oops ... Il semble qu'il y a eu un petit problème veuillez réessayer
      </div>
    );
  if (!users)
    return (
      <Skeleton className="m-10" animate>
        <div className="h-full rounded-md bg-primary/55 p-12">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold">Paramètres</h1>
              <h2>Modifiez vos paramètres de compte</h2>
            </div>
          </div>
          <div className="flex h-full gap-8 py-12">
            <div className="flex flex-col items-center gap-3"></div>
          </div>
        </div>
      </Skeleton>
    );

  return (
    <div className="w-full p-12">
      <div className="rounded-md bg-primary/55 p-12">
        <h1 className="text-2xl font-bold">Membres de la MSP</h1>
        <div className="grid grid-cols-2 gap-y-6 p-20 md:grid-cols-3">
          {users?.map((user) => (
            <div key={user.id} className="p-4">
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
