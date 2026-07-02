import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { articleSchema } from "@/lib/infrastructure/articles/schema";

const blog = defineCollection({
  loader: glob({
    pattern: "**/content.mdx",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\/content\.mdx$/, ""),
  }),
  schema: articleSchema,
});

export const collections = { blog };
