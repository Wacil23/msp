import type { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { directus } from "@/src/lib/directus";
import { login, readMe, refresh } from "@directus/sdk";
import { JWT } from "next-auth/jwt";
import { AuthRefresh, UserSession, UserParams } from "@/types/next-auth";
import { handleError } from "@/src/utils/handleError";

const userParams = (user: UserSession): UserParams => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
  };
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Entrez votre adresse email",
        },
        password: {
          label: "Mot de passe",
          type: "password",
          placeholder: "Entrez votre mot de passe",
        },
      },
      authorize: async function (credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const api = directus();
          const auth = await api.request(login(email, password));
          const apiAuth = directus(auth.access_token ?? "");
          const loggedInUser = await apiAuth.request(
            readMe({
              fields: ["id", "first_name", "last_name", "email"],
            })
          );
          const user: Awaitable<User> = {
            id: loggedInUser.id,
            email: loggedInUser.email,
            first_name: loggedInUser.first_name,
            last_name: loggedInUser.last_name,
            access_token: auth.access_token ?? "",
            expires: Math.floor(Date.now() / 1000 + (auth.expires ?? 0)),
            refresh_token: auth.refresh_token ?? "",
          };
          return user;
        } catch (e: any) {
          const errorMessage =
            e?.error?.message || "Email ou mot de passe incorrect";
          handleError(errorMessage);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/connexion",
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      if (account) {
        return {
          access_token: user.access_token,
          expires_at: Math.floor(Date.now() / 1000 + (user.expires ?? 0)),
          refresh_token: account.refresh_token,
          user: userParams(user),
        };
      } else if (Date.now() < (token.expires_at ?? 0) * 1000) {
        return token;
      } else {
        try {
          const apiAuth = directus();
          const result: AuthRefresh = await apiAuth.request(
            refresh("json", user.refresh_token)
          );
          return {
            ...token,
            access_token: result.access_token ?? "",
            expires_at: Math.floor(Date.now() / 1000 + (result.expires ?? 0)),
            refresh_token: result.refresh_token ?? user.refresh_token,
            user: userParams(user),
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }): Promise<Session> {
      session.error = token.error ?? "";
      const { id, name, email } = token.user as UserParams;
      session.user = { id, name, email };
      return session;
    },
  },
};
