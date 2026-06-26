# ART — Unified Agents

A single-page web app that presents **ART**'s suite of AI agents as an
interactive card directory. Visitors browse a grid of agents, open a detail
page for any one, and use the live agent app embedded directly in the page.

> **Live example:** individual agents are deployed separately (e.g.
> `https://chargeback-management-system.pages.dev/`) and surfaced here through a
> single, consistent directory UI.

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
  - [Routing](#routing)
  - [The landing page](#the-landing-page)
  - [The card grid](#the-card-grid)
  - [The detail / embed page](#the-detail--embed-page)
- [The agent data model](#the-agent-data-model)
- [Common tasks](#common-tasks)
  - [Add a new agent](#add-a-new-agent)
  - [Make a coming-soon agent go live](#make-a-coming-soon-agent-go-live)
  - [Edit card copy](#edit-card-copy)
  - [Change a card icon](#change-a-card-icon)
- [Styling & theming](#styling--theming)
- [Assets](#assets)
- [Build & deployment](#build--deployment)
- [Branching & remotes](#branching--remotes)
- [Current agents](#current-agents)
- [Conventions & gotchas](#conventions--gotchas)

---

## Overview

- **Type:** Front-end-only static SPA. There is **no backend** in this repo.
- **Purpose:** One unified directory for many independently-hosted AI agent apps.
- **Pattern:** All content is **data-driven** from a single array
  (`src/agents.js`). Adding or editing an agent is a data change, not a code
  change.
- **Embedding:** Each agent's live app is shown inside a sandboxed `<iframe>` on
  its detail page. Agents without a URL render a "coming soon" panel instead.

---

## Tech stack

| Area         | Choice                                            |
|--------------|---------------------------------------------------|
| Build tool   | [Vite](https://vitejs.dev/) 5                     |
| Framework    | React 18                                          |
| Routing      | react-router-dom 7 (`BrowserRouter`)              |
| Animation    | framer-motion 12                                  |
| 3D / visuals | three 0.160 + @react-three/fiber + @react-three/drei |
| React plugin | `@vitejs/plugin-react-swc`                        |
| Language     | JavaScript + JSX (no TypeScript)                  |

---

## Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
cd "front end"
npm install
npm run dev
```

Vite prints a local URL (default `http://localhost:5173/`). If that port is
taken it automatically picks the next free one (5174, 5175, …).

---

## Available scripts

Run from the `front end/` directory:

| Script            | Description                                  |
|-------------------|----------------------------------------------|
| `npm run dev`     | Start the Vite dev server with HMR.          |
| `npm run build`   | Production build into `dist/`.               |
| `npm run preview` | Serve the built `dist/` locally to verify.   |

---

## Project structure

```
front end/
├── index.html                 # HTML entry; sets <title> and favicon, mounts #root
├── vite.config.js             # Vite config (React SWC plugin)
├── package.json               # Scripts and dependencies
├── public/                    # Static assets served at site root "/"
│   ├── logo1 (1).png          # Brand logo (top-left on landing page)
│   └── Logo (2).png           # Favicon
└── src/
    ├── main.jsx               # React entry + route definitions
    ├── App.jsx                # Landing page (logo, hero, discs, cards)
    ├── agents.js              # SINGLE SOURCE OF TRUTH — the AGENTS array
    ├── AppCards.jsx           # Card grid built from AGENTS
    ├── AgentProfile.jsx       # Detail/embed page (iframe or "coming soon")
    ├── AgentDetail.jsx        # ⚠️ Not wired into the router — dead code (see gotchas)
    ├── cardIcons.jsx          # Maps { slug: png-url } from assets/icons/*.png
    ├── RotatingText.jsx       # Typewriter rotating words in the hero
    ├── ScrollDiscs.jsx        # Scroll-reactive 3D disc background
    ├── Discs.jsx              # Disc geometry/visuals (three.js)
    ├── index.css              # Global + landing-page styles
    ├── detail.css             # Detail/embed-page styles
    └── assets/
        ├── disc-*.png         # Disc textures (incl. yellow "-y" variants)
        └── icons/<slug>.png   # Per-agent card icons (accent-coloured)
```

---

## How it works

### Routing

Defined in `src/main.jsx` with `BrowserRouter`:

| Path              | Component        | Purpose                          |
|-------------------|------------------|----------------------------------|
| `/`               | `App`            | Landing page + card grid         |
| `/profile/:slug`  | `AgentProfile`   | Per-agent detail / embedded app  |

### The landing page

`App.jsx` composes:
- a fixed brand logo (top-left),
- a **hero** with an animated headline — `RotatingText` cycles through
  `AI Agents → Chatbots → AI Portals → Automations → Copilots` with a
  typewriter effect,
- a `ScrollDiscs` three.js background,
- a **"Show More"** button that smooth-scrolls to the card grid (`#more`),
- the `AppCards` grid below the fold.

### The card grid

`AppCards.jsx` maps over `AGENTS` and renders one `Card` each:
- Cards animate in on scroll (framer-motion), staggered by index.
- A pointer-tracking effect sets `--mx` / `--my` CSS vars for a hover glow.
- The card shows: icon (PNG from `cardIcons`, else the emoji), `name`,
  `short` description, and `tags` pills.
- Clicking (or Enter/Space) navigates to `/profile/<slug>`.
- `layoutId`s on the card/icon/name enable shared-element transitions.

### The detail / embed page

`AgentProfile.jsx` looks up the agent by `:slug`:

1. **Not found** → "Agent not found" message + link home.
2. **Found, has `url`** → top bar (Back, "Open in new tab") + a sandboxed
   `<iframe>` loading the live agent app.
3. **Found, empty `url`** → a "coming soon" panel showing the agent's emoji
   icon, `name`, and `tagline`.

The iframe is sandboxed with:
`allow-scripts allow-same-origin allow-forms allow-popups
allow-popups-to-escape-sandbox allow-downloads allow-modals`, and
`allow="clipboard-write; microphone; camera"`.

---

## The agent data model

Every agent is one object in the `AGENTS` array in
[`src/agents.js`](src/agents.js). Fields:

| Field          | Type                              | Drives                                                        |
|----------------|-----------------------------------|---------------------------------------------------------------|
| `name`         | string                            | Card title, detail header, framer `layoutId` keys             |
| `slug`         | string                            | URL `/profile/<slug>` **and** icon filename `<slug>.png`      |
| `icon`         | string (emoji)                    | Fallback card icon + the "coming soon" page icon              |
| `accent`       | hex color                         | Per-card accent via the `--accent` CSS variable               |
| `url`          | string                            | Live app embedded in iframe. **`''` ⇒ "coming soon" page.**   |
| `tag`          | string                            | Category label (e.g. `Finance`, `Compliance`)                 |
| `rating`       | number                            | Display rating                                                |
| `short`        | string                            | One-line card description on the grid (~8–12 words)           |
| `tagline`      | string                            | Hero line on the detail / coming-soon page                    |
| `tags`         | `[{ label, type }]`               | Pills on the card. `type` is `green` or `blue`                |
| `whoFor`       | string                            | Detail — target audience                                      |
| `whatYouGet`   | string                            | Detail — value summary                                        |
| `howItWorks`   | string                            | Detail — how to use it                                        |
| `featureGroups`| `[{ title, items: [] }]`          | Detail — grouped feature lists                                |
| `useCases`     | `[{ title, desc, industry }]`     | Detail — example scenarios                                    |
| `specs`        | `[[label, value]]`                | Detail — spec table rows                                      |

> **Note:** `whoFor`, `whatYouGet`, `howItWorks`, `featureGroups`, `useCases`,
> and `specs` are authored for every agent but are **not yet rendered** by the
> current `AgentProfile.jsx` (which embeds the live app instead). They are ready
> for a richer detail view — see the dead-code note about `AgentDetail.jsx`.

### Example entry

```js
{
  name: 'Chargeback Management System',
  slug: 'chargeback-management-system',
  icon: '💳',
  accent: '#F5C010',
  url: 'https://chargeback-management-system.pages.dev/',
  tag: 'Finance',
  rating: 4.6,
  short: 'Track, manage and resolve payment chargebacks end-to-end.',
  tagline: 'Manage every chargeback from one place — track disputes, organize evidence and resolve cases on time.',
  tags: [{ label: 'New', type: 'green' }, { label: 'Finance', type: 'blue' }],
  whoFor: '…',
  whatYouGet: '…',
  howItWorks: '…',
  featureGroups: [{ title: 'Disputes', items: ['Case logging & tracking', '…'] }],
  useCases: [{ title: 'Dispute resolution', desc: '…', industry: 'Payments' }],
  specs: [['Deployment', 'Web app'], ['Pricing', 'Contact sales']],
}
```

---

## Common tasks

### Add a new agent

1. Copy an existing object in [`src/agents.js`](src/agents.js) and edit its
   fields. Give it a unique `slug`.
2. Add a card icon at `src/assets/icons/<slug>.png` — the filename **must**
   match the `slug` exactly (that's how `cardIcons.jsx` maps it).
3. Set `url` to the live app, or leave it `''` to show the "coming soon" page.

No other files need changing — the grid and routes are generated from the data.

### Make a coming-soon agent go live

Set the agent's `url` to its deployed app URL. Optionally update its pill from
`{ label: 'New' }` to `{ label: 'Live' }` to match other live agents.

### Edit card copy

- `short` — the blurb shown on the **grid** card (keep it short, ~8–12 words).
- `tagline` — the hero line on the **detail / coming-soon** page.

### Change a card icon

Replace `src/assets/icons/<slug>.png`. Icons are accent-coloured PNG line-icons.
If no matching PNG exists, the card falls back to the emoji in the `icon` field.

---

## Styling & theming

- **`index.css`** — global styles, hero, and the card grid (`.apps-grid`,
  `.app-card`, pills, gradients).
- **`detail.css`** — the embed/detail page (`.embed-page`, `.embed-bar`,
  `.embed-frame`, `.embed-soon`).
- **Accent color:** each card/detail page sets `--accent` from the agent's
  `accent` field; CSS uses it for highlights and the hover glow
  (`--mx` / `--my` pointer variables).
- **Brand palette:** yellow/gold accents (e.g. `#F5C010`, `#EAB308`).

---

## Assets

- `public/` is served at the site root. The logo is referenced as
  `/logo1%20(1).png` and the favicon as `/Logo%20(2).png` (note the URL-encoded
  spaces).
- `src/assets/disc-*.png` are the three.js disc textures (plain + yellow `-y`
  variants).
- `src/assets/icons/*.png` are the per-agent card icons, loaded in bulk via
  `import.meta.glob` in `cardIcons.jsx`.

---

## Build & deployment

- **Build:** `npm run build` → outputs to `dist/`.
- **Host:** Cloudflare Pages (`*.pages.dev`). Recommended Pages settings:
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
  - **Root directory:** `front end` (the app is not at repo root)
- _TODO: document which git branch maps to which Cloudflare Pages
  project/environment._

---

## Branching & remotes

- **Remotes:**
  - `origin` → `https://github.com/artie-bee/Agent-Layout.git`
  - `hisham` → `https://github.com/hishamislah-py/Agent-Layout.git`
- **Branches:** `main`, `development`, plus working branches (e.g.
  `hisham-main`).

---

## Current agents

> Snapshot — the source of truth is always `src/agents.js`.

**Live** (have a `url`, embedded via iframe):
HR Agent · Cold Email Generator · Fintech Chatbot · Unified Chatbot ·
Art Intelligence Platform · FintechOps · Scheme Compliance Portal ·
Chargeback Management System · Reconciliation Agent

**Coming soon** (empty `url`, show the "coming soon" panel):
Incident Triage & RCA Agent · KYC / KYB Client Onboarding Agent ·
Fraud Detection Agent

---

## Conventions & gotchas

- **Single source of truth:** all agent content is in `src/agents.js`. Prefer
  data edits over component edits.
- **`slug` is load-bearing:** it's used for both the route and the icon
  filename. Keep them in sync.
- **`AgentDetail.jsx` is currently dead code** — it is not imported by the
  router (`main.jsx` only uses `AgentProfile.jsx`). It appears to be a
  richer detail layout that would consume the `whoFor` / `featureGroups` /
  `useCases` / `specs` fields. Wire it up or remove it to avoid confusion.
- **Rich detail fields aren't rendered yet:** `AgentProfile.jsx` embeds the live
  app rather than displaying `featureGroups`, `useCases`, etc. They're authored
  and ready for when a content-rich detail page is built.
- **URL-encoded asset names:** the logo/favicon filenames contain spaces and
  parentheses and are referenced URL-encoded (`%20`). Renaming them to
  hyphenated names would be cleaner.
- **No tests / no linter config** in this project at present.
```
