/**
 * Client-side language detection & preference persistence for the portfolio i18n.
 *
 * Detects the user's preferred language from the browser on first visit, saves it
 * to localStorage, and redirects bilingual paths (blog/*) accordingly. On subsequent
 * visits the saved preference is read first, so the manual language switch is sticky.
 *
 * The module is designed so the core logic can be inlined (IIFE) in
 * `main-layout.astro`'s `<head>` for zero-wait execution, while the named exports
 * stay available for the language switcher in `blog-layout.astro`.
 */

export const STORAGE_KEY = "portfolio-lang";

export type Lang = "es" | "en";

const SUPPORTED: readonly Lang[] = ["es", "en"];
const DEFAULT_LANG: Lang = "es";

/** Paths under which both language versions exist. */
const BILINGUAL_PREFIXES = ["/blog", "/en/blog"];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Read the persisted language preference (or null if absent / unavailable). */
export function getSavedLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "es" || v === "en") return v;
  } catch {
    // localStorage may be blocked (private browsing, permissions).
  }
  return null;
}

/** Persist the user's language choice. */
export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Silently ignore.
  }
}

/** Detect the user's preferred language from browser settings. */
export function getBrowserLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;

  const locales: readonly string[] =
    navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const locale of locales) {
    const code = locale.slice(0, 2) as Lang;
    if ((SUPPORTED as readonly string[]).includes(code)) return code;
  }
  return DEFAULT_LANG;
}

/** Determine the current language from `window.location.pathname`. */
export function getCurrentLang(): Lang {
  return /^\/en(\/|$)/.test(window.location.pathname) ? "en" : "es";
}

/** Returns `true` when `path` has equivalent content in both languages. */
export function isBilingualPath(path: string): boolean {
  return BILINGUAL_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/"),
  );
}

/**
 * Build the locale-switched URL for a given `targetLang`.
 *
 * Strips any existing `/es` or `/en` prefix and re-applies the target prefix.
 * The default locale (`es`) is prefixless.
 */
export function getLocalizedUrl(targetLang: Lang): string {
  const path = window.location.pathname;
  const base = path
    .replace(/^\/(es|en)(?=\/|$)/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  const normalized = targetLang === "en" ? `/en/${base}` : `/${base}`;
  // Avoid double slashes when base is empty.
  return normalized.replace(/\/+$/, "") || "/";
}

/**
 * Main entry — run this as early as possible on every page load.
 *
 * 1. If the user has a saved preference that differs from the current page
 *    language AND the path is bilingual → redirect.
 * 2. Otherwise, on first visit, detect the browser language, persist it, and
 *    redirect if the path is bilingual.
 *
 * Safe to call multiple times (idempotent — once the URL and localStorage
 * agree, nothing happens).
 */
export function detectAndRedirect(): void {
  const currentLang = getCurrentLang();
  const savedLang = getSavedLang();

  if (savedLang) {
    // Existing user — respect their saved preference.
    if (savedLang !== currentLang && isBilingualPath(window.location.pathname)) {
      redirectTo(savedLang);
    }
    return;
  }

  // First visit — detect & persist.
  const browserLang = getBrowserLang();
  saveLang(browserLang);

  if (browserLang !== currentLang && isBilingualPath(window.location.pathname)) {
    redirectTo(browserLang);
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function redirectTo(targetLang: Lang): void {
  const target = getLocalizedUrl(targetLang);
  if (window.location.pathname !== target) {
    window.location.replace(target);
  }
}
