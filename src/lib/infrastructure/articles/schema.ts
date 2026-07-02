import { z } from "astro/zod";
import type { ImageMetadata } from "astro";

export const articleImageSchema = z.object({
  url: z.custom<ImageMetadata>(),
  alt: z.string(),
});

export const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  updated: z.date().optional(),
  tags: z.array(z.string()),
  cover: articleImageSchema,
  estimatedReadingTime: z.number().positive(),
});

export type ArticleImage = z.infer<typeof articleImageSchema>;
export type Article = z.infer<typeof articleSchema>;
