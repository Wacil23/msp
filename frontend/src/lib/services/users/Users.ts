import {
  DirectusClient,
  DirectusUser,
  RestClient,
  StaticTokenClient,
  readMe,
  readUsers,
  updateMe,
  withToken,
} from "@directus/sdk";
import { directus } from "../../directus";
import { UserSession } from "@/types/next-auth";

export const getAllUsers = async (token: string) => {
  const api = directus(token);
  const users = await api.request<DirectusUser<UserSession>[]>(
    withToken(token, readUsers())
  );
  return users;
};

export const getMembersUsers = async (token: string) => {
  const api = directus();
  const users = await api.request<DirectusUser<UserSession>[]>(
    withToken(
      token,
      readUsers({
        filter: {
          role: {
            name: "membre",
          },
        },
      })
    )
  );
  return users;
};

export const getMe = async (token: string) => {
  const api = directus(token);
  const user = await api.request<DirectusUser<UserSession>>(
    withToken(
      token,
      readMe({
        fields: [
          "id",
          "first_name",
          "last_name",
          "email",
          "avatar",
          "profession",
          "telephone",
          "access_token",
          "expires",
          "refresh_token",
        ],
      })
    )
  );
  return user;
};
export const UpdateMe = async (
  token: string,
  newUser: Partial<DirectusUser<UserSession>>
) => {
  const api = directus(token);
  const user = await api.request<DirectusUser<UserSession>>(updateMe(newUser));
  return user;
};
