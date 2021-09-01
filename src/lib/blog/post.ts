import { Asset, Entry, EntryFields } from "contentful";
import { client } from "../utils/contentful";
import { Author } from "./author";

export interface BlogPost {
  title: EntryFields.Text;
  slug: EntryFields.Text;
  description: EntryFields.Text;
  cover: Asset;
  content: EntryFields.RichText;
  authors: Entry<Author>[];
}

export async function listBlogPosts(): Promise<Entry<BlogPost>[]> {
  const res = await client.getEntries<BlogPost>({
    content_type: "post",
    order: "-sys.createdAt",
  });
  return res.items;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<Entry<BlogPost>> {
  const res = await client.getEntries<BlogPost>({
    content_type: "post",
    "fields.slug": slug,
  });
  if (res.items.length !== 1) {
    throw new Error("post not found");
  }
  return res.items[0];
}
