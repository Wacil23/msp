import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from "@directus/sdk";

export const directus = (token: string = "") => {
  if (token) {
    return createDirectus("http://host.docker.internal:8055")
      .with(staticToken(token))
      .with(rest({ credentials: "include" }));
  }
  return createDirectus("http://host.docker.internal:8055")
    .with(authentication())
    .with(rest({ credentials: "include" }));
};
