import { uploadFiles } from "@directus/sdk";
import { directus } from "../../directus";

export const UploadFiles = async (token: string, files: FormData) => {
  const api = directus(token);
  const file = await api.request(uploadFiles(files));
  return file;
};
