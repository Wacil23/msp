"use server";
import { readMe, readUsers, updateMe, withToken } from "@directus/sdk";
import { directus } from "../../directus";
import { UserSession } from "@/types/next-auth";

export const getAllUsers = async (token: string) => {
  const api = directus(token);
  try {
    const users = await api.request<UserSession[]>(
      withToken(token, readUsers()),
    );
    return users;
  } catch (e) {}
};

export const getMembersUsers = async (token: string) => {
  const api = directus();
  try {
    const users = await api.request<UserSession[]>(
      withToken(
        token,
        readUsers({
          filter: {
            role: {
              name: "membre",
            },
          },
        }),
      ),
    );
    return users;
  } catch (e) {
    console.error("Unable to call member users");
  }
};

export const getMe = async (token: string) => {
  const api = directus(token);
  try {
    const user = await api.request<UserSession>(
      withToken(
        token,
        readMe({
          fields: [
            "id",
            "first_name",
            "last_name",
            "last_access",
            "email",
            "avatar",
            "profession",
            "telephone",
            "access_token",
            "expires",
            "refresh_token",
            "role",
          ],
        }),
      ),
    );
    return user;
  } catch (e) {}
};
export const UpdateMe = async (
  token: string,
  newUser: Partial<UserSession>,
) => {
  try {
    const api = directus(token);
    const user = await api.request<UserSession>(updateMe(newUser));
    return user;
  } catch (e) {}
};
