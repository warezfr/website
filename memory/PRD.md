# Dynatrace Club — SmartMag-inspired EmDash theme

## Problem statement (original, verbatim)
> consulte le projet https://github.com/warezfr/website, je veux que en se basant sur ce cms emdash, que tu me crée un joli theme blog, pour mon site dynatrace.club qui va servir de site d'articles observability, dynatrace, ai , ...
>
> (iteration 2) ce theme est très minimaliste, je cherche quelque chose qui ressemble à https://smartmag.theme-sphere.com/good-news/

## Goal
Deploy EmDash CMS (Astro + TypeScript fork by warezfr) locally and deliver a
custom theme for `dynatrace.club` — a publication on Observability, Dynatrace
and AI — styled after the SmartMag **GoodNews** demo (dense news-magazine
layout with colored category badges, multi-section homepage, sidebar widgets).

## Architecture
- **Monorepo**: `/app` (pnpm workspace)
  - `packages/*` — EmDash core, admin, blocks, plugins, cloudflare adapter, etc.
  - `templates/dynatrace-blog` — **custom theme for dynatrace.club (new)**
  - `templates/blog` — reference blog theme (unmodified)
- **Runtime**: Astro SSR via `@astrojs/node`, SQLite via `better-sqlite3`
- **Port**: Astro dev server on `0.0.0.0:3000` (proxied by `/app/frontend` → `templates/dynatrace-blog`)
- **DB**: `templates/dynatrace-blog/data.db` (migrated + seeded)
- **Supervisor**: existing `frontend` program runs `yarn start` which in turn
  runs Astro dev against the dynatrace-blog template.

## Custom theme — what's been implemented (April 2026)

### Files created / modified
- `templates/dynatrace-blog/package.json` — `@dynatrace-club/theme-blog`
- `templates/dynatrace-blog/astro.config.mjs` — IBM Plex Sans + Source Serif 4 + JetBrains Mono
- `templates/dynatrace-blog/src/utils/site-identity.ts` — defaults: "Dynatrace Club"
- `templates/dynatrace-blog/src/styles/theme.css` — magazine tokens (colors, type, category colors)
- `templates/dynatrace-blog/src/layouts/Base.astro` — top bar + centered brand + sticky nav + footer
- `templates/dynatrace-blog/src/pages/index.astro` — magazine homepage (7 sections)
- `templates/dynatrace-blog/src/components/CategoryBadge.astro` — colored category pill
- `templates/dynatrace-blog/src/components/MagCard.astro` — card primitive (hero/stack/row/minimal)
- `templates/dynatrace-blog/seed/seed.json` — full custom seed (categories + 7 posts + pages + menus)

### Visual identity
- **Signal accent**: `#e63946` (breaking-news red)
- **Category colors**:
  - Observability → `#e63946` (red)
  - Dynatrace → `#1d4ed8` (blue)
  - AI → `#f59e0b` (amber)
  - SRE & Reliability → `#059669` (emerald)
- **Typography**: IBM Plex Sans (UI/headlines) + Source Serif 4 (article body)
- **Light + dark mode** with cookie-persisted toggle in top bar

### Homepage sections (order)
1. Dark **top bar** (date, tagline, RSS, Subscribe, theme toggle)
2. Centered **brand header** with animated pulse dot + "Dynatrace.Club"
3. Sticky **nav bar** (Home · Articles · Observability · Dynatrace · AI · SRE · About) + search
4. **3-column hero grid** — 3 most-recent featured stories with overlaid category badges
5. **Editors' Choice** strip (grey card, 4 posts row)
6. **Observability** section (big card + 3 thumbnail list)
7. **Sponsored band** CTA (red left accent, sample Dynatrace-ready OTel starter pack)
8. **Dynatrace Deep Dives** + **AI & LLM Ops** — 2-column with blue/amber accents
9. **SRE & Reliability** — 3-up trio grid
10. **Latest Posts** — 3×2 grid + "Load more" button
11. **Newsletter CTA** — big radial-gradient block with pulse dot
12. **Footer** with 4 columns: brand, navigate, topics, widget area + red top-border

### Seeded content
- **7 editorial posts** across Observability / Dynatrace / AI / SRE categories
- **2 pages**: About, Colophon
- **12 tags**: OpenTelemetry, Distributed Tracing, Davis AI, Kubernetes, Dashboards, LLM Ops, etc.
- **3 bylines**: Dynatrace Club Editorial, warez, Guest Contributor
- **Primary menu** with 6 items
- **Widget areas**: sidebar (search + categories + tags + recent posts) + footer

### Verified pages (all 200)
`/`, `/posts`, `/category/{observability|dynatrace|ai|sre}`,
`/posts/<slug>`, `/pages/about`, `/rss.xml`, `/search`.

## Access
- **Front of site**: preview URL root
- **Admin**: `/_emdash/admin` (EmDash built-in; configure via `emdash auth` CLI)
- **API**: `/_emdash/api/*`

## Backlog / future enhancements
- P1 — **Sidebar on single-post pages**: wire in the seeded sidebar widget area with Magazine styling
- P1 — **Breaking-news ticker** in the top bar (currently static categories string)
- P2 — **Social share buttons** on post pages
- P2 — **Author pages** with avatar + bio + post list
- P2 — **Commenting**: already enabled in collection config; surface a polished comment form
- P2 — **Category-specific archive headers** (hero strip with the category color)
- P3 — **Newsletter backend**: wire the CTA form to ConvertKit / Mailchimp / Resend
- P3 — **AI summary**: auto-generate 2-line TL;DR per article (Emergent LLM key + GPT-5.2)
