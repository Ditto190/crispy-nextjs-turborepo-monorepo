# Dashboard Integration Plan

**Target repo:** `Ditto190/crispy-nextjs-turborepo-monorepo`  
**Design reference:** WorldMonitor dashboard  
**Status:** Planning — this document drives the follow-up implementation PR.

---

## 1. Overview

The goal is to integrate a WorldMonitor-inspired dashboard into this Turborepo monorepo. WorldMonitor is used as an **architectural and design reference only** — not as a codebase to transplant. All components will be built fresh, using the monorepo's existing conventions (Tailwind CSS 4, shadcn/ui, Radix primitives, TypeScript strict mode).

### Monorepo package boundaries

| Package / App | Role in dashboard integration |
|---|---|
| `packages/types` | Shared dashboard data contracts (TypeScript interfaces) |
| `packages/ui` | Reusable dashboard primitive components |
| `packages/utils` | Shared formatting/helpers (already present) |
| `apps/server` | Express API — preset data endpoints, mock data |
| `apps/web` | Next.js — dashboard route, page composition, preset loading |

---

## 2. What is and is not ported from WorldMonitor

### ✅ Ported (design and vocabulary only)

- **Component vocabulary**: stat/KPI cards, alert lists, activity feeds, progress lists, section headers, data tables.
- **Layout patterns**: card-based grid, section-per-domain grouping, status-colour coding.
- **Information architecture**: top-level KPI metrics, grouped alert panel, per-category progress items, recent-activity timeline.

### ❌ Not ported

- WorldMonitor's React component source code (licence is unrelated; components will be authored fresh).
- WorldMonitor's backend infrastructure (monitoring agents, data collectors, WebSocket subscriptions).
- Any WorldMonitor-specific business logic, data models, or third-party service integrations.
- Server-side monitoring/alerting pipelines.

---

## 3. Implementation phases

### Phase 1 — Shared type contracts (`packages/types`)

Establish the single source of truth for all dashboard data shapes.

#### Files to add

```
packages/types/src/dashboard/
  index.ts          — re-exports everything below
  metrics.ts        — KPI / stat-card types
  alerts.ts         — alert-list item types
  activity.ts       — activity-feed entry types
  presets.ts        — preset/bootstrap shape
  registry.ts       — component-registry manifest types
```

#### `packages/types/src/index.ts` — modify

Add `export * from "./dashboard";` so all dashboard types are available via `@monorepo/types`.

#### Key types (illustrative, not final)

```ts
// metrics.ts
export interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: { direction: "up" | "down" | "flat"; percentage: number };
  status?: "ok" | "warning" | "critical";
}

// alerts.ts
export interface AlertItem {
  id: string;
  title: string;
  description?: string;
  severity: "info" | "warning" | "critical";
  timestamp: string; // ISO-8601
}

// activity.ts
export interface ActivityEntry {
  id: string;
  actor: string;
  action: string;
  target?: string;
  timestamp: string;
}

// presets.ts
export interface DashboardPreset {
  id: string;
  label: string;
  description?: string;
  stats: StatCardData[];
  alerts: AlertItem[];
  activity: ActivityEntry[];
}

// registry.ts
export interface ComponentRegistryEntry {
  type: string;           // e.g. "StatCard"
  category: string;       // e.g. "metrics"
  requiredProps: string[];
  exampleProps: Record<string, unknown>;
}
export type ComponentRegistry = ComponentRegistryEntry[];
```

#### Dependencies introduced

None — `packages/types` has no runtime dependencies.

---

### Phase 2 — Dashboard UI primitives (`packages/ui`)

Build five purpose-built dashboard components on top of existing shadcn primitives.

#### Files to add

```
packages/ui/src/components/dashboard/
  stat-card.tsx       — KPI metric tile
  section-header.tsx  — Labelled section divider with optional CTA
  alert-list.tsx      — Severity-coded list of alerts
  progress-list.tsx   — Labelled list of items with progress bars
  activity-feed.tsx   — Chronological activity timeline
```

#### Dependency on `packages/types`

Each component accepts its corresponding type from `@monorepo/types` as its primary prop. Add `@monorepo/types` to `packages/ui/package.json` `dependencies`.

#### Component design notes

| Component | Base primitives used | Key prop types |
|---|---|---|
| `StatCard` | `Card`, `Badge`, `Separator` | `StatCardData` |
| `SectionHeader` | `Separator` | `{ title, description?, action? }` |
| `AlertList` | `Card`, `Badge`, `ScrollArea` | `AlertItem[]` |
| `ProgressList` | `Card`, `Progress` | `{ label, value, max }[]` |
| `ActivityFeed` | `ScrollArea`, `Avatar`, `Badge` | `ActivityEntry[]` |

#### `packages/ui/src/components/dashboard/index.ts` — new

Re-export all five components for clean imports:

```ts
export * from "./stat-card";
export * from "./section-header";
export * from "./alert-list";
export * from "./progress-list";
export * from "./activity-feed";
```

#### `packages/ui/package.json` — modify

Add `"@monorepo/types": "workspace:*"` to `dependencies`.  
Add exports entry:

```json
"./components/dashboard/*": "./src/components/dashboard/*.tsx"
```

#### Dependencies introduced

- `@monorepo/types` (workspace peer, no extra npm package)

---

### Phase 3 — Server preset endpoints (`apps/server`)

Add a lightweight preset API so the frontend can load dashboard data on demand.

#### Files to add

```
apps/server/src/routes/dashboard.ts   — /v1/dashboard routes
apps/server/src/data/presets.ts       — in-memory preset fixtures
```

#### Files to modify

```
apps/server/src/routes/index.ts       — mount dashboard router
```

#### Endpoint contract

```
GET /v1/dashboard/presets
  → 200 { presets: DashboardPreset[] }

GET /v1/dashboard/presets/:id
  → 200 { preset: DashboardPreset }
  → 404 { error: "Not found" }

GET /v1/dashboard/registry
  → 200 { registry: ComponentRegistry }
```

#### Preset fixtures to add

| Preset ID | Label | Description |
|---|---|---|
| `project-management` | Project Management | Sprint health, blockers, velocity |
| `executive-summary` | Executive Summary | High-level KPIs, top risks, recent wins |
| `analytics` | Analytics Overview | Traffic, conversion, performance metrics |
| `ops` | Operations | Infrastructure health, error rates, uptime |

#### Dependencies introduced

None beyond what `apps/server` already has. All data is in-memory JSON; no database required in Phase 1.

---

### Phase 4 — Next.js dashboard route (`apps/web`)

Wire the dashboard into the Next.js app using the App Router.

#### Files to add

```
apps/web/src/app/dashboard/
  layout.tsx           — dashboard shell: sidebar nav + header
  page.tsx             — default dashboard (loads "project-management" preset)
  loading.tsx          — skeleton loading state

apps/web/src/app/dashboard/[preset]/
  page.tsx             — dynamic route for named presets

apps/web/src/app/components/dashboard/
  dashboard-layout.tsx  — grid layout composition component
  preset-loader.tsx     — client component: fetches preset from server, renders grid
  stat-card-grid.tsx    — responsive grid of StatCard tiles
  alert-panel.tsx       — AlertList wrapper with panel chrome
  activity-panel.tsx    — ActivityFeed wrapper with panel chrome
```

#### Files to modify

```
apps/web/src/app/layout.tsx  — ensure nav links to /dashboard are present
apps/web/src/app/page.tsx    — add a "Go to Dashboard" entry point card
```

#### Routing design

```
/dashboard              → loads preset "project-management"
/dashboard/[preset]     → loads the named preset (e.g. /dashboard/analytics)
```

The `[preset]` segment maps 1:1 to preset IDs returned by `GET /v1/dashboard/presets`.

#### Environment variable

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Add to `apps/web/.env.local.example` (do not commit real values).

#### `apps/web/package.json` — modify

Add `"@monorepo/types": "workspace:*"` and `"@monorepo/ui": "workspace:*"` to `dependencies` if not already present.

#### Dependencies introduced

None new — all UI comes from `packages/ui`; all types from `packages/types`.

---

### Phase 5 — Testing and guardrails

#### Unit / integration tests to add

| File | What it tests |
|---|---|
| `packages/types/src/dashboard/__tests__/contracts.test.ts` | Type-shape sanity: ensure preset fixtures satisfy all required fields |
| `packages/ui/src/components/dashboard/__tests__/stat-card.test.tsx` | Renders with valid props, renders fallback with missing optional props |
| `packages/ui/src/components/dashboard/__tests__/alert-list.test.tsx` | Renders correct severity colours, handles empty array gracefully |
| `apps/server/src/__tests__/dashboard.test.ts` | GET /v1/dashboard/presets returns expected shape; 404 on unknown preset |
| `apps/web/src/app/dashboard/__tests__/preset-loader.test.tsx` | Shows skeleton on load, shows grid on success, shows error on failure |

#### Contract guardrails

- A `packages/types/src/dashboard/registry.ts` defines the canonical allowed component list.
- A companion test (`registry.test.ts`) asserts that every component exported from `packages/ui/src/components/dashboard/` has a corresponding registry entry.
- This prevents UI/contract drift over time.

#### Error boundaries

Each dashboard component should be wrapped in a React error boundary so a single malformed data item does not crash the whole page. Add `apps/web/src/app/components/dashboard/dashboard-error-boundary.tsx`.

---

## 4. File-by-file summary

### New files

| File | Package / App | Purpose |
|---|---|---|
| `packages/types/src/dashboard/index.ts` | types | Dashboard type barrel export |
| `packages/types/src/dashboard/metrics.ts` | types | `StatCardData` type |
| `packages/types/src/dashboard/alerts.ts` | types | `AlertItem` type |
| `packages/types/src/dashboard/activity.ts` | types | `ActivityEntry` type |
| `packages/types/src/dashboard/presets.ts` | types | `DashboardPreset` type |
| `packages/types/src/dashboard/registry.ts` | types | `ComponentRegistryEntry` and `ComponentRegistry` types |
| `packages/ui/src/components/dashboard/index.ts` | ui | Dashboard component barrel export |
| `packages/ui/src/components/dashboard/stat-card.tsx` | ui | KPI metric tile component |
| `packages/ui/src/components/dashboard/section-header.tsx` | ui | Section divider component |
| `packages/ui/src/components/dashboard/alert-list.tsx` | ui | Alert list component |
| `packages/ui/src/components/dashboard/progress-list.tsx` | ui | Progress list component |
| `packages/ui/src/components/dashboard/activity-feed.tsx` | ui | Activity timeline component |
| `apps/server/src/data/presets.ts` | server | In-memory preset fixtures |
| `apps/server/src/routes/dashboard.ts` | server | `/v1/dashboard` route handlers |
| `apps/web/src/app/dashboard/layout.tsx` | web | Dashboard shell layout |
| `apps/web/src/app/dashboard/page.tsx` | web | Default dashboard page |
| `apps/web/src/app/dashboard/loading.tsx` | web | Dashboard loading skeleton |
| `apps/web/src/app/dashboard/[preset]/page.tsx` | web | Dynamic preset page |
| `apps/web/src/app/components/dashboard/dashboard-layout.tsx` | web | Grid composition component |
| `apps/web/src/app/components/dashboard/preset-loader.tsx` | web | Preset fetch + render client component |
| `apps/web/src/app/components/dashboard/stat-card-grid.tsx` | web | Responsive StatCard grid |
| `apps/web/src/app/components/dashboard/alert-panel.tsx` | web | Alert panel wrapper |
| `apps/web/src/app/components/dashboard/activity-panel.tsx` | web | Activity feed panel wrapper |
| `apps/web/src/app/components/dashboard/dashboard-error-boundary.tsx` | web | Per-panel error boundary |
| `apps/web/.env.local.example` | web | Environment variable template |

### Modified files

| File | Change |
|---|---|
| `packages/types/src/index.ts` | Add `export * from "./dashboard"` |
| `packages/ui/package.json` | Add `@monorepo/types` dep; add `dashboard/*` export entry |
| `apps/server/src/routes/index.ts` | Mount `/dashboard` router |
| `apps/web/src/app/layout.tsx` | Add dashboard nav link |
| `apps/web/src/app/page.tsx` | Add dashboard entry point card |
| `README.md` | Reference this plan and the `/dashboard` route |

---

## 5. Inter-package dependency graph

```
packages/utils
    ↑
packages/types
    ↑
packages/ui ──────────────────┐
    ↑                          ↑
apps/server          apps/web
(preset data API)    (dashboard pages + components)
```

- `packages/utils` has no internal deps (leaf).
- `packages/types` has no internal deps (leaf).
- `packages/ui` depends on `packages/utils` (already) and `packages/types` (new).
- `apps/server` depends on `packages/types` (types only, no UI).
- `apps/web` depends on `packages/ui`, `packages/types`, and `packages/utils`.

---

## 6. Phased implementation order

| Phase | Scope | Rationale |
|---|---|---|
| 1 | `packages/types` — dashboard contracts | Foundation; unblocks all other work |
| 2 | `packages/ui` — dashboard components | Reusable primitives; unblocks web app |
| 3 | `apps/server` — preset endpoints | Mock data layer; enables real fetch in web |
| 4 | `apps/web` — route + page composition | Wires everything together |
| 5 | Tests + guardrails across all packages | Safety net before any further iteration |

Each phase can be opened as a separate PR, or all five can be combined into a single "dashboard foundation" PR if the team prefers atomic delivery.

---

## 7. Initial milestone scope (Dashboard Foundation)

The following is the **minimum viable set** for a working dashboard foundation:

- [x] Plan document (this file)
- [ ] `packages/types` — 5 new files (dashboard contracts)
- [ ] `packages/ui` — 5 new component files + barrel
- [ ] `apps/server` — preset fixtures + 3 GET endpoints
- [ ] `apps/web` — `/dashboard` route with static and dynamic preset pages
- [ ] Basic error boundary around each dashboard panel
- [ ] Contract guardrail test: registry ↔ component export alignment

**Out of scope for this milestone** (deferred):

- Real-time WebSocket data
- Authentication / per-user dashboards
- Persistent storage (database-backed presets)
- Charts / graph visualisations (beyond basic progress bars)
- Theming / white-label support
- Mobile-specific layout optimisations

---

## 8. Conventions to follow

- All TypeScript files use strict mode (`"strict": true` in tsconfig).
- Component files use `.tsx`; pure-type files use `.ts`.
- Import paths use `@monorepo/*` workspace aliases, not relative cross-package paths.
- Tailwind classes only — no inline style objects except for dynamic CSS custom properties.
- Every new component is a named export; no default exports in component files.
- `cn()` from `@monorepo/utils/styles` is used for conditional class merging.
- Server route handlers are typed with `Request`/`Response` from `express`.
- All API responses follow the existing envelope pattern: `{ data }` or `{ error }`.
