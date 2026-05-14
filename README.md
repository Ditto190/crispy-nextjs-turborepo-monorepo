# Full Stack Monorepo with Turborepo, ESLint, Next.js, Express.js, Tailwind CSS, and shadcn

A full-stack monorepo starter template using **Turborepo**, **Next.js**, **Express.js**, **Tailwind CSS**, **shadcn**, and **ESLint**. Based on [The Halftime Code](https://www.thehalftimecode.com/building-a-full-stack-monorepo-with-turbopack-biome-next-js-express-js-tailwind-css-and-shadcn/) tutorial.

## Features

- **Monorepo** managed by Turborepo with pnpm workspaces
- **Next.js 16** frontend with React 19 and Turbopack
- **Express.js** backend with TypeScript
- **Tailwind CSS 4** with shadcn/ui components
- **TypeScript 6** with strict mode across all packages
- **ESLint 10** with flat config (`.ts` config files), Prettier, and perfectionist
- **GitHub Actions CI/CD** with lint, build, type-check, and optional tests
- **Codespaces + VS Code workspace** pre-configured for monorepo development

## Project Structure

```
/apps
  /web          — Next.js frontend
  /server       — Express.js backend

/packages
  /types        — Shared types and API client
  /ui           — shadcn component library (Tailwind CSS)
  /utils        — Shared utility functions
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ivesfurtado/next-express-turborepo.git
   cd next-express-turborepo
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

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | Next.js 16, React 19, Tailwind CSS 4, shadcn/ui  |
| Backend  | Express.js, TypeScript                           |
| Build    | Turborepo, pnpm workspaces                       |
| Linting  | ESLint 10 (flat config), Prettier, perfectionist |
| Language | TypeScript 6 (strict)                            |

## License

MIT

## Further Reading

For further details on building and setting up this monorepo, check out the original tutorial on [The Halftime Code](https://www.thehalftimecode.com/building-a-full-stack-monorepo-with-turbopack-biome-next-js-express-js-tailwind-css-and-shadcn/).
