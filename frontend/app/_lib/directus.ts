import { createDirectus, rest, readItems } from "@directus/sdk";

const directus = createDirectus("https://doc.petitdino.fr").with(rest());

export { directus, readItems };
