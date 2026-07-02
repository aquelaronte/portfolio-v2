import { getCollection } from "astro:content";

async function fetchArticlesCollection() {
  return getCollection("blog");
}

export async function fetchAllArticles(limit = 10) {
  const collection = await fetchArticlesCollection();

  return collection
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, limit);
}

export type Article = Awaited<
  ReturnType<typeof fetchArticlesCollection>
>[number];
