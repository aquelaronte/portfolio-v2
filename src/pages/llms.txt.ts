import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  getArticleLang,
  getArticleSlug,
} from "@/lib/infrastructure/articles/fetch";

// Prerender to a static /llms.txt at build time.
export const prerender = true;

// https://llmstxt.org — a curated, plain-text/Markdown map of the site meant to
// be read by LLMs and AI answer engines. Generated from the blog collection so
// it stays in sync with published content.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://arias.systems")).origin;

  const articles = (await getCollection("blog")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const urlFor = (a: (typeof articles)[number]) => {
    const slug = getArticleSlug(a);
    return getArticleLang(a) === "en"
      ? `${base}/en/blog/${slug}/`
      : `${base}/blog/${slug}/`;
  };

  const line = (a: (typeof articles)[number]) =>
    `- [${a.data.title}](${urlFor(a)}): ${a.data.description}`;

  const es = articles.filter((a) => getArticleLang(a) === "es").map(line);
  const en = articles.filter((a) => getArticleLang(a) === "en").map(line);

  const body = `# Brahian Arias

> Portfolio and blog of Brahian Arias, a Software Engineer focused on backend, cloud infrastructure and artificial intelligence. The blog documents real-world software architecture, system design, backend, cloud and AI decisions.

## Blog (Español)

${es.join("\n")}

## Blog (English)

${en.join("\n")}

## Links

- [Website](${base}/)
- [Blog](${base}/blog/)
- [GitHub](https://github.com/aquelaronte)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
