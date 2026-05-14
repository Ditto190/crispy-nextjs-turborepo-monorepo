import { projectManagementDashboardPreset } from "@monorepo/ui/dashboard/presets";
import {
  renderDashboardElements,
  safeParseDashboardState,
} from "@monorepo/ui/dashboard/registry";

import GetTest from "./components/get-test";

export default function Home() {
  const parsedPreset = safeParseDashboardState(
    projectManagementDashboardPreset,
  );

  const dashboardElements = parsedPreset.success
    ? renderDashboardElements(parsedPreset.data.elements)
    : [];

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold">Monorepo Showcase</h1>
        <p className="text-muted-foreground">
          This demo shows API connectivity alongside a reusable GenUI dashboard
          component library ported for this turborepo.
        </p>
      </header>

      <div className="space-y-10">
        <section>
          <h2 className="mb-4 text-xl font-semibold">API Integration Demo</h2>
          <GetTest />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Dashboard Starter Preset
          </h2>
          {parsedPreset.success ? (
            <div className="grid gap-4 md:grid-cols-2">{dashboardElements}</div>
          ) : (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              Failed to load dashboard preset.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
