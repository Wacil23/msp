import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    access_token: string;
    expires: number;
    refresh_token: string;
    avatar?: string;
    profession?: string;
    telephone?: string;
    civility?: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      first_name?: string;
      last_name?: string;
      avatar?: string;
      profession?: string;
      telephone?: string;
      civility?: string;
    };
    acess_token?: string;
    refresh_token?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    error?: string;
  }
}

export type AuthRefresh = {
  access_token?: string | null;
  expires?: number | null;
  refresh_token?: string | null;
};

export type UserSession = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  access_token: string;
  expires: number;
  refresh_token: string;
  avatar?: string;
  telephone?: string;
  profession?: string;
  civility?: string;
};

export type UserParams = {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  telephone?: string;
  profession?: string;
  civility?: string;
};

export type UserAuthenticated = {
  id?: string;
  name?: string;
  email?: string;
};
