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
      first_name?: string | null;
      last_name?: string | null;
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
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
  location: string | null;
  title: string | null;
  description: string | null;
  tags: string[] | null;
  avatar: DirectusFile<Schema> | string | null;
  language: string | null;
  theme: string | null;
  tfa_secret: string | null;
  status: string;
  role: DirectusRole<Schema> | string | null;
  token: string | null;
  last_access: "datetime" | null;
  last_page: string | null;
  provider: string;
  external_identifier: string | null;
  auth_data: Record<string, any> | null;
  email_notifications: boolean | null;
  profession?: string;
  telephone?: string;
  civility?: string;
};

export type UserParams = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string | null;
  name: string;
  avatar: DirectusFile<Schema> | string | null;
  telephone?: string;
  profession?: string;
  civility?: string;
};

export type UserAuthenticated = {
  id?: string;
  name?: string;
  email?: string;
};
