# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Uchtem is a premium financial-management / business-consulting brand website. The
strategic brand blueprint (positioning, sitemap, design system, homepage plan) lives in
this session's plan; the site is implemented as a Vite + React + TypeScript SPA.

The homepage (`src/routes/Home.tsx` and its section components) is fully built and
bilingual (Ukrainian primary, English secondary). The other six routes exist with
real copy but are English-only so far — a follow-up pass should translate them using
the same `home` i18n namespace pattern.

## Commands

- `npm run dev` — Vite dev server with HMR, default port 5173
- `npm run build` — typecheck (`tsc`) then production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm test` — run the Vitest suite once (not watch mode; use `npx vitest` for watch)

ESLint is not configured. TypeScript `strict: true` is the main static check, run as
part of `npm run build`.

## Stack

- React 19 + TypeScript, built with **Vite** (migrated off the original Create React
  App scaffold — CRA doesn't support Tailwind v4 cleanly and is CSR-only, which hurt
  the SEO story for a lead-gen marketing site).
- **Tailwind CSS v4**, CSS-first config via `@theme` in `src/styles/index.css` (brand
  tokens: `ink`, `paper`, `ivory`, `graphite`, `stone`, `mist`, `brass`, `signal`).
- **react-router-dom v7** for routing; **Framer Motion** for scroll reveals, count-up
  stats, and the hero. **react-helmet-async** for per-route `<head>` management.
- UI primitives (`src/components/base/*`) were pulled from the UntitledUI MCP
  component registry (free tier: Button, Input, TextArea, NativeSelect, Form) and
  fully restyled onto the brand's token system — UntitledUI's own default semantic
  theme (`bg-brand-solid`, `text-fg-quaternary`, etc.) was intentionally not adopted.
  Any UntitledUI component pulled in later needs the same restyle treatment before use.
- **i18next + react-i18next** for translation. See "Internationalization" below.
- Vitest + `@testing-library/react` for tests (`src/setupTests.ts` initializes jsdom
  polyfills for `IntersectionObserver`/`scrollTo` and boots i18next for the test env).

## Internationalization

Ukrainian is the **primary/default** language; English is secondary.

- **Routing**: `/` and its subpaths render Ukrainian; the identical route tree is
  mirrored under `/en` for English (see `src/App.tsx` — `appRouteChildren` is reused
  under both `<Route path="/">` and `<Route path="/en">`). `Layout` calls
  `useLocaleSync()` (`src/i18n/locale.ts`) on every navigation to sync i18next's
  active language and `<html lang>` to whichever prefix is in the URL.
- **Never hardcode an internal `<Link>`/`href`.** Use `useLocalizedPath()` (returns a
  `lp(path)` function) so links stay on the current language when clicked — passing a
  bare, Ukrainian-locale path in (e.g. `lp("/contact")`) and letting it add `/en` when
  appropriate. The header's language switcher uses `useOtherLocalePath()` to link to
  the equivalent page in the other language.
- **Translation resources**: `src/i18n/locales/{ua,en}/{common,home}.json`, loaded via
  `src/i18n/index.ts`. `common` covers global chrome (nav, footer, CTA button) used on
  every page. `home` covers the homepage's own copy — and is also picked up "for
  free" by shared section components (`ServicesGrid`, `TwoPillars`, `Method`) when
  they're reused on not-yet-translated pages, since those components already call
  `useTranslation("home")` directly.
- **Localized content**: `src/content/insights.ts` stores `title`/`category`/`excerpt`
  as `{ ua, en }` objects; use the `localize()` helper to read the active language's
  field rather than accessing a language key directly.
- **Adding a new page-specific string**: add it to both locale JSON files under the
  relevant namespace, then pull it with `useTranslation("home")` (or add a new
  namespace and register it in `src/i18n/index.ts` for a new page's unique copy).
- **SEO**: `Seo.tsx` emits `hreflang` alternates (`uk`, `en`, `x-default`) and a
  locale-correct canonical URL from the bare path each route passes in — routes should
  keep passing the Ukrainian-locale path (e.g. `path="/services"`) regardless of which
  language is currently active; `Seo` handles the `/en` prefixing itself.

## Known gaps (flagged, not yet done)

- Services, Financial Management, Business Consulting, About, Insights, and Contact
  pages have real English copy but are not yet translated into Ukrainian — visiting
  them at a bare (Ukrainian-locale) URL currently mixes Ukrainian chrome with English
  body copy. Translate page-by-page using the `home` namespace pattern above.
- Favicon/OG image are still CRA placeholders — need real brand assets.
- Contact form posts to a placeholder Formspree endpoint (`src/lib/formspree.ts`) —
  swap in a real form ID before launch.
