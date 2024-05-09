import type { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { directus } from "@/src/lib/directus";
import { login, readMe, refresh } from "@directus/sdk";
import { JWT } from "next-auth/jwt";
import { UserSession, UserParams } from "@/types/next-auth";
import { handleError } from "@/src/utils/handleError";

const userParams = (user: UserSession): UserParams => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
    avatar: user.avatar,
    telephone: user.telephone,
    profession: user.profession,
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
              fields: [
                "id",
                "first_name",
                "last_name",
                "email",
                "avatar",
                "profession",
                "telephone",
              ],
            })
          );
          const user: Awaitable<User> = {
            id: loggedInUser.id,
            email: loggedInUser.email,
            first_name: loggedInUser.first_name,
            last_name: loggedInUser.last_name,
            avatar: loggedInUser.avatar,
            profession: loggedInUser.profession,
            telephone: loggedInUser.telephone,
            access_token: auth.access_token ?? "",
            expires: Math.floor(Date.now() / 1000 + (auth.expires ?? 0)),
            refresh_token: auth.access_token ?? "",
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
    maxAge: 60 * 15,
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
          refresh_token: user.refresh_token,
          user: userParams(user),
        };
      } else if (Date.now() >= (token.expires_at ?? 0) * 1000) {
        try {
          const apiAuth = directus(token.access_token);
          const refreshedToken = await apiAuth.request(
            refresh("json", token.refresh_token)
          );
          const updatedUser = await apiAuth.request<UserSession>(
            readMe({
              fields: [
                "id",
                "first_name",
                "last_name",
                "email",
                "avatar",
                "profession",
                "telephone",
              ],
            })
          );
          return {
            access_token: refreshedToken.access_token ?? "",
            expires_at: Math.floor(
              Date.now() / 1000 + (refreshedToken.expires ?? 0)
            ),
            refresh_token: refreshedToken.refresh_token ?? token.refresh_token,
            user: userParams(updatedUser),
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      } else {
        return token;
      }
    },
    async session({ session, token }): Promise<Session> {
      session.error = token.error ?? "";
      session.acess_token = token.access_token;
      session.refresh_token = token.refresh_token;
      const {
        id,
        name,
        email,
        first_name,
        last_name,
        avatar,
        profession,
        telephone,
      } = token.user as UserParams;
      session.user = {
        id,
        name,
        email,
        first_name,
        last_name,
        avatar,
        profession,
        telephone,
      };
      return session;
    },
  },
};
