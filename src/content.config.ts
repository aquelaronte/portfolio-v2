import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { articleSchema } from "@/lib/infrastructure/articles/schema";

const blog = defineCollection({
  loader: glob({
    // `content.mdx` is the Spanish (default) article; `content.<lang>.mdx`
    // (e.g. `content.en.mdx`) holds a per-locale translation of the same slug.
    pattern: "**/content*.mdx",
    base: "./src/content/blog",
    // Encode the locale into the entry id as `<lang>/<slug>` so a single
    // collection holds every language; pages filter by the id prefix.
    generateId: ({ entry }) => {
      const match = entry.match(/^(.+?)\/content(?:\.([a-z]{2}))?\.mdx$/);
      if (!match) return entry;
      const [, slug, lang] = match;
      return `${lang ?? "es"}/${slug}`;
    },
  }),
  schema: articleSchema,
});

export const collections = { blog };
