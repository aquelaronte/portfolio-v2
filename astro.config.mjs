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
    // Mermaid is large and only ever loaded via dynamic import(). If Vite discovers
    // it late (via that dynamic import) it re-optimizes mid-session and trips over
    // itself ("The file does not exist ... in the optimize deps directory"), and in
    // dev its CommonJS deps (d3, dagre, ...) fail to load as raw ESM, so the diagram
    // never renders. Pre-bundling it up front fixes both — dev renders like prod.
    optimizeDeps: {
      include: ["mermaid"],
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
