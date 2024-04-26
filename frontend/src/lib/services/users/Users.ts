import { readUsers } from "@directus/sdk";
import { directus } from "../../directus";

export const getAllUsers = async (token?: string) => {
  const api = directus(token);
  const users = await api.request(readUsers());
  return users;
};
