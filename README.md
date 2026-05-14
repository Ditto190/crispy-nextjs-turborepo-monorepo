# Full Stack Monorepo with Turborepo, ESLint, Next.js, Express.js, Tailwind CSS, and shadcn

A full-stack monorepo starter template using **Turborepo**, **Next.js**, **Express.js**, **Tailwind CSS**, **shadcn**, and **ESLint**. Based on [The Halftime Code](https://www.thehalftimecode.com/building-a-full-stack-monorepo-with-turbopack-biome-next-js-express-js-tailwind-css-and-shadcn/) tutorial.

This template includes a **baked-in design system** powered by Storybook, so you can develop, document, and showcase shared UI components alongside your Next.js app in the same monorepo.

## Features

- **Monorepo** managed by Turborepo with pnpm workspaces
- **Next.js 16** frontend with React 19 and Turbopack
- **Express.js** backend with TypeScript
- **Tailwind CSS 4** with shadcn/ui components
- **Design system** via `packages/ui` — shared React component library
- **Storybook 8** docs app (`apps/docs`) for component development and documentation
- **TypeScript 6** with strict mode across all packages
- **ESLint 10** with flat config (`.ts` config files), Prettier, and perfectionist
- **GitHub Actions CI/CD** with lint, build, type-check, and optional tests
- **Codespaces + VS Code workspace** pre-configured for monorepo development

## Project Structure

```
/apps
  /web          — Next.js frontend (consumes @monorepo/ui)
  /server       — Express.js backend
  /docs         — Storybook component docs (design system playground)

/packages
  /types        — Shared types and API client
  /ui           — shadcn-based design system (Tailwind CSS 4)
  /utils        — Shared utility functions
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ditto190/crispy-nextjs-turborepo-monorepo.git
   cd crispy-nextjs-turborepo-monorepo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001`
   - Storybook: `http://localhost:6006`

4. **Build for production**

   ```bash
   pnpm build
   ```

5. **Lint**

   ```bash
   pnpm lint
   ```

6. **Type-check shared packages**

   ```bash
   pnpm -r --if-present check-types
   ```

## Design System Workflow

The monorepo ships with a shared component library (`packages/ui`) and a Storybook docs app (`apps/docs`) for developing and documenting those components.

### Working with shared components

Components live in `packages/ui/src/components/`. They are built with [shadcn/ui](https://ui.shadcn.com) patterns and Tailwind CSS 4.

**Add a new shadcn component to the library:**

```bash
pnpm add-shadcn-component <component-name>
```

**Import a shared component in your Next.js app:**

```tsx
import { Button } from "@monorepo/ui/components/button";

export default function Page() {
  return <Button variant="outline">Hello from the design system</Button>;
}
```

### Storybook — component docs and playground

Start Storybook locally:

```bash
pnpm --filter docs dev
# or run all dev servers including Storybook:
pnpm dev
```

Build the static Storybook site:

```bash
pnpm --filter docs build
```

Preview the static Storybook build:

```bash
pnpm preview-storybook
```

### Adding a new story

Create a file in `apps/docs/stories/` following the CSF (Component Story Format):

```tsx
// apps/docs/stories/input.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@monorepo/ui/components/input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "UI/Input",
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Type something..." },
};
```

### Turbo pipeline — how tasks connect

| Script                   | What it does                                                                |
| ------------------------ | --------------------------------------------------------------------------- |
| `pnpm dev`               | Runs all `dev` scripts in parallel (Next.js + Express.js + Storybook)       |
| `pnpm build`             | Builds all packages and apps (including Storybook static site)              |
| `pnpm lint`              | Lints all packages                                                          |
| `pnpm preview-storybook` | Builds and serves the Storybook static output                               |
| `pnpm clean`             | Removes all build artifacts and `node_modules`                              |

## CI/CD

- `/.github/workflows/ci-cd.yml` runs out-of-the-box checks on pull requests and pushes:
  - `pnpm lint`
  - `pnpm build`
  - `pnpm -r --if-present check-types`
  - `pnpm -r --if-present test`
- On `main`, the workflow also uploads build artifacts (`apps/server/dist`, `apps/web/.next`) as a delivery-ready foundation.

## VS Code + Codespaces

- Open this repository in GitHub Codespaces to use `/.devcontainer/devcontainer.json`.
- Use the included `monorepo.code-workspace` for a pre-configured multi-root workspace.
- Existing `.vscode` settings and extension recommendations are included for local VS Code usage.

## Expanding to Nuxt and other frameworks

This monorepo already supports framework expansion via:

- `pnpm-workspace.yaml` (`apps/*`, `packages/*`)
- Turborepo task orchestration in `turbo.json`

To add Nuxt (or another framework app), create a new folder under `apps/` (for example `apps/nuxt`) and add package scripts (`dev`, `build`, `lint`, optional `test`) so it participates in shared workspace and CI checks automatically.

## Tech Stack

| Layer         | Technology                                       |
| ------------- | ------------------------------------------------ |
| Frontend      | Next.js 16, React 19, Tailwind CSS 4, shadcn/ui  |
| Backend       | Express.js, TypeScript                           |
| Design System | packages/ui (shadcn), Storybook 8                |
| Build         | Turborepo, pnpm workspaces                       |
| Linting       | ESLint 10 (flat config), Prettier, perfectionist |
| Language      | TypeScript 6 (strict)                            |

## License

MIT

## Further Reading

For further details on building and setting up this monorepo, check out the original tutorial on [The Halftime Code](https://www.thehalftimecode.com/building-a-full-stack-monorepo-with-turbopack-biome-next-js-express-js-tailwind-css-and-shadcn/).
