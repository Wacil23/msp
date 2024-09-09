"use client";
import React, { createContext, useContext } from "react";
import { getMe } from "../services/users/Users";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig, KeyedMutator } from "swr";
import { UserSession } from "@/types/next-auth";
import { Session } from "next-auth";

interface UserContextProviderProps {
  me?: UserSession | null;
  mutateMe: KeyedMutator<any>;
  status: "authenticated" | "loading" | "unauthenticated";
  session: Session | null;
  error?: any;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProviderProps | undefined>(
  undefined,
);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const { mutate } = useSWRConfig();
  const fetcher = () =>
    session?.acess_token ? getMe(session.acess_token) : null;
  const {
    data: me,
    error,
    isLoading,
  } = useSWR(session?.acess_token ? "users/me" : null, fetcher);
  const mutateMe: KeyedMutator<any> = () => {
    return mutate("users/me", fetcher);
  };

  return (
    <UserContext.Provider
      value={{ me, mutateMe, status, session, error, isLoading }}
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
