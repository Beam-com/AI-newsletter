# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

「AI 電子週報」— a static website for a company's internal "bring AI into work" weekly sharing-session
series. Each week's session becomes one "topic" published to the site. Pure HTML/CSS/JS, no build
tools, no package manager, no dependencies.

## Commands

There is no build/lint/test tooling. To preview locally:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` (or just open `index.html` directly in a browser).

## Publishing a new weekly topic

Edit `js/topics.js` only — it is the single source of truth for all content on both pages:

1. Add a new object to the `topics` array with `published: false`.
2. When the session is ready to go public, flip `published` to `true`. This is what makes the
   topic appear (unlocked) in the grid and enter the hero carousel — nothing else needs to change.

`highlights` accepts two shapes and the renderers (`buildSections()` in `js/topic-detail.js`)
branch on which one is used:
- array of plain strings → rendered as a single "重點摘要" bullet-list section
- array of `{ title, body, image? }` objects → rendered as one section per object, each becoming
  its own table-of-contents entry on the detail page

## Architecture

Two pages share the same three-script-load pattern, in this order:

```
js/topics.js  → js/header.js → js/script.js (index.html) / js/topic-detail.js (topic.html)
```

`topics.js` must load first because it just defines global `const topics = [...]` with no module
system — every other script reads that global directly.

- **`index.html` + `js/script.js`** — home page. Topics are sorted by `sortKey()`, which parses
  the free-text `date` field (e.g. `"7/29 (三) 14:00-15:00"`) with a regex and hardcodes the year
  `2026`; update that hardcoded year (or the field format) if this site is reused past 2026.
  Layout is a hero carousel (published topics only, never shows locked ones) followed by a
  two-part grid: first 3 sorted topics go in a 3-column top row, the rest in a 4-column bottom
  row that grows downward. Unpublished topics render as locked "敬請期待" cards/slides instead of
  being omitted, so the schedule stays visible even before content drops.
- **`topic.html` + `js/topic-detail.js`** — detail page for a single topic, selected via
  `?id=<topics[].id>` in the URL. Reads directly from the same `topics` array (looked up by id),
  so there is no separate per-topic data file.
- **`js/header.js`** — shared across both pages: renders the nav modals ("關於這個系列" /
  "OFFICE HOUR" / "場次"), including the `sessionSchedule` table (real-world date/dept/location
  per session), which is separate data from `topics.js` and needs to be kept in sync manually
  when session logistics change.
- **Dark mode** — `localStorage.getItem("theme")` (`"dark" | "light" | null`), falling back to
  `prefers-color-scheme` when unset. The toggle logic is duplicated verbatim in `js/script.js`
  and `js/topic-detail.js` (no shared module) — if you change theme behavior, update both. CSS
  variables live in `css/style.css` under `:root`, `:root[data-theme="dark"]`, and
  `:root[data-theme="light"]`.
- **Deployment** — GitHub Pages, `main` branch root. The site is intentionally kept out of search
  engines (`robots.txt` + `<meta name="robots" content="noindex, nofollow">` on every page) but
  has no auth — anyone with the link can view it.
- **Analytics** — a GoatCounter tracking script (`data-goatcounter="https://beam-ai-newsletter.goatcounter.com/count"`)
  is appended after the other scripts, right before `</body>`, on both `index.html` and
  `topic.html`. No code-side wiring is needed for per-topic breakdown: GoatCounter's default path
  is `location.pathname + location.search`, so `topic.html?id=1` and `topic.html?id=2` are already
  counted as distinct pages. View counts at `https://beam-ai-newsletter.goatcounter.com` (not in
  this repo). Counts are stored on GoatCounter's servers, keyed by URL — redeploying or editing
  site code never resets them; only changing a topic's `id` (which changes its URL) would orphan
  its history.
