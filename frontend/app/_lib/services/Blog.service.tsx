import { directus, readItems } from "../directus";

const GetBlog = async () => {
  await directus.request(readItems("blog"));
};
export default GetBlog;
