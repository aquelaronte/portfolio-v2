import type { Article, ArticleListItem } from "./schema";
import { getCollection, getEntry } from "astro:content";

export async function fetchAllArticles(limit = 10): Promise<ArticleListItem[]> {
  const collection = await getCollection("blog");

  return collection
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, limit)
    .map((entry) => ({ ...entry.data, id: entry.id }));
}

export async function fetchArticleById(
  id: string,
): Promise<Article | undefined> {
  const entry = await getEntry("blog", id);

  return entry?.data;
}
