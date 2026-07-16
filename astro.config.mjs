// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

import mdx from "@astrojs/mdx";

import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react(), mdx()],

  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      // Spanish (default) stays at /blog; English lives at /en/blog.
      prefixDefaultLocale: false,
    },
  },

  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer"],
          },
        ],
      ],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle deps that Vite would otherwise discover *late* (on first render).
    // A late discovery forces a mid-session re-optimize + SSR worker reload, which
    // the Cloudflare workerd dev runner cannot survive — it then throws
    // "module is not defined" from getComponentByRoute on every request until a
    // full restart. Listing them here bundles them during the initial optimize pass
    // so the worker never reloads.
    //   - mermaid: also only ever loaded via dynamic import(); its CommonJS deps
    //     (d3, dagre, ...) otherwise fail to load as raw ESM so diagrams never render.
    //   - astro-icon/components: used by article/homepage components; its lazy
    //     optimization is what triggers the workerd "module is not defined" crash.
    optimizeDeps: {
      include: ["mermaid", "astro-icon/components"],
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["400", "500", "700"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["400", "600"],
    },
    {
      provider: fontProviders.google(),
      name: "Jacquard 12",
      cssVariable: "--font-jacquard",
    },
  ],

  adapter: cloudflare({
    prerenderEnvironment: "node",
  }),
});
