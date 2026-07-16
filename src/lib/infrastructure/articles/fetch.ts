import { getCollection } from "astro:content";
import { defaultLang, type Lang } from "@/lib/i18n/ui";

async function fetchArticlesCollection() {
  return getCollection("blog");
}

/** The locale an article belongs to, decoded from its `<lang>/<slug>` id. */
export function getArticleLang(article: Article): Lang {
  return (article.id.split("/")[0] as Lang) ?? defaultLang;
}

/** The locale-independent slug used in URLs, decoded from the `<lang>/<slug>` id. */
export function getArticleSlug(article: Article): string {
  return article.id.split("/").slice(1).join("/");
}

export async function fetchAllArticles(lang: Lang = defaultLang, limit = 10) {
  const collection = await fetchArticlesCollection();

  return collection
    .filter((article) => getArticleLang(article) === lang)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, limit);
}

export type Article = Awaited<
  ReturnType<typeof fetchArticlesCollection>
>[number];
