import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from "@directus/sdk";

export const directus = (token: string = "") => {
  if (token) {
    return createDirectus("https://doc.petitdino.fr")
      .with(staticToken(token))
      .with(rest());
  }
  return createDirectus("https://doc.petitdino.fr")
    .with(authentication())
    .with(rest());
};
