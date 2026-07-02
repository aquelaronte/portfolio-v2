import { z } from "astro/zod";
import type { SchemaContext } from "astro:content";

export const articleImageSchema = (image: SchemaContext["image"]) =>
  z.object({
    url: image(),
    alt: z.string(),
  });

export const articleSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()),
    cover: articleImageSchema(image),
    estimatedReadingTime: z.number().positive(),
  });

export type ArticleImage = z.infer<ReturnType<typeof articleImageSchema>>;
export type Article = z.infer<ReturnType<typeof articleSchema>>;
export type ArticleListItem = Article & { id: string };
