"use client";
import React, { createContext, useContext, useEffect } from "react";
import { getAllUsers, getMe } from "../services/users/Users";
import { signOut, useSession } from "next-auth/react";
import useSWR, { useSWRConfig, KeyedMutator } from "swr";
import { UserSession } from "@/types/next-auth";
import { Session } from "next-auth";
import { notifications } from "@mantine/notifications";
import { BiErrorCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface UserContextProviderProps {
  me?: UserSession | null;
  mutateMe: KeyedMutator<any>;
  status: "authenticated" | "loading" | "unauthenticated";
  session: Session | null;
  error?: any;
  loadingMe?: boolean;
  loadingUsers?: boolean;
  users?: UserSession[] | null;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextProviderProps | undefined>(
  undefined,
);
const ADMIN_ROLE = process.env.NEXT_PUBLIC_ADMIN_ROLE;

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { mutate } = useSWRConfig();
  const meFetcher = () =>
    session?.acess_token ? getMe(session.acess_token) : null;
  const {
    data: me,
    error,
    isLoading: loadingMe,
  } = useSWR(session?.acess_token ? "users/me" : null, meFetcher);
  const mutateMe: KeyedMutator<any> = () => {
    return mutate("users/me", meFetcher);
  };

  const usersFetcher = () =>
    session?.acess_token ? getAllUsers(session?.acess_token) : null;

  const { data: users, isLoading: loadingUsers } = useSWR(
    session?.acess_token ? "users/" : null,
    usersFetcher,
  );
  useEffect(() => {
    if ((!me || !users) && !loadingMe && !loadingUsers) {
      notifications.show({
        title: "Vous êtes déconnecté",
        color: "red",
        icon: <BiErrorCircle />,
        message: "Vous avez perdu la connexion, veuillez vous reconnecter",
      });
      signOut();
      router.push("/connexion");
      return;
    }
  }, [me, users, loadingMe, loadingUsers]);

  const isAdmin = me?.role === ADMIN_ROLE;
  console.log(isAdmin, me?.role, ADMIN_ROLE);

  return (
    <UserContext.Provider
      value={{
        me,
        mutateMe,
        status,
        session,
        error,
        loadingMe,
        users,
        isAdmin,
      }}
      key={me?.id}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContextProvider = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUnreadMessages must be used within an UnreadMessagesProvider",
    );
  }
  return context;
};
