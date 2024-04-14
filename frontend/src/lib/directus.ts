import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from "@directus/sdk";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS;
export const directus = (token: string = "") => {
  if (token) {
    return createDirectus(directusUrl!)
      .with(staticToken(token))
      .with(rest({ credentials: "include" }));
  }
  return createDirectus(directusUrl!)
    .with(authentication())
    .with(rest({ credentials: "include" }));
};
