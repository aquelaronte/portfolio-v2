// Blog i18n dictionary + helpers.
//
// Spanish is the default locale (served at /blog); English is prefixed (/en/blog).
// Components read their language from `Astro.currentLocale` (derived from the URL
// by Astro's i18n routing) via `getLang`, then look strings up with `useTranslations`.

export const languages = {
  es: "Español",
  en: "English",
} as const;

export const defaultLang: Lang = "es";

export type Lang = keyof typeof ui;

export const ui = {
  es: {
    "header.about": "Sobre mi",
    "hero.title": "notas de campo",
    "hero.intro":
      "aquí encontraras mis apuntes y observaciones sobre los retos a los que me enfrento sobre arquitectura de software, infraestructura cloud e inteligencia artificial",
    "showcase.recent": "~/post --recent",
    "showcase.articles": "artículos",
    "card.read": "leer",
    "article.back": "~/blog",
    "index.title": "índice",
    "mode.label": "modo:",
    "mode.regular": "regular",
    "mode.immersive": "inmersivo",
    "blog.seo.title":
      "Blog de Brahian | Artículos de Software Engineering | Backend, IA y Cloud",
    "blog.seo.description":
      "Explora mi blog donde detallo sobre arquitectura de software, backend e inteligencia artificial. Podrías encontrar la solución a tus próximos retos o aprender conmigo",
    "cite.copy": "Copiar",
    "cite.cite": "Citar",
    "cite.copied": "¡Copiado!",
    "cite.dialog.title": "Citar este artículo",
    "cite.dialog.intext": "Cita en el texto (APA 7ª ed.)",
    "cite.dialog.reference": "Referencia (APA 7ª ed.)",
    "cite.dialog.copyReference": "Copiar referencia",
    "cite.dialog.share": "Compartir",
    "cite.dialog.close": "Cerrar",
  },
  en: {
    "header.about": "About me",
    "hero.title": "field notes",
    "hero.intro":
      "here you'll find my notes and observations on the challenges I face around software architecture, cloud infrastructure and artificial intelligence",
    "showcase.recent": "~/post --recent",
    "showcase.articles": "articles",
    "card.read": "read",
    "article.back": "~/blog",
    "index.title": "index",
    "mode.label": "mode:",
    "mode.regular": "regular",
    "mode.immersive": "immersive",
    "blog.seo.title":
      "Brahian's Blog | Software Engineering Articles | Backend, AI and Cloud",
    "blog.seo.description":
      "Explore my blog where I dig into software architecture, backend and artificial intelligence. You might find the solution to your next challenges or learn alongside me",
    "cite.copy": "Copy",
    "cite.cite": "Cite",
    "cite.copied": "Copied!",
    "cite.dialog.title": "Cite this article",
    "cite.dialog.intext": "In-text citation (APA 7th ed.)",
    "cite.dialog.reference": "Reference (APA 7th ed.)",
    "cite.dialog.copyReference": "Copy reference",
    "cite.dialog.share": "Share",
    "cite.dialog.close": "Close",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

/** Narrow an `Astro.currentLocale` string to a supported `Lang`, falling back to the default. */
export function getLang(locale: string | undefined): Lang {
  return locale && locale in ui ? (locale as Lang) : defaultLang;
}

/** Returns a `t(key)` lookup bound to `lang`, falling back to the default locale for missing keys. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
