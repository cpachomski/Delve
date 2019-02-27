import { request } from "graphql-request";
import query from "./query";

export async function delve(url: string) {
  try {
    const schema = await request(url, query);
    return schema;
  } catch (err) {
    return console.error(err);
  }
}
