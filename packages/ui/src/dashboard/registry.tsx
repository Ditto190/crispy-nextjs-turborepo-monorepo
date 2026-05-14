import type { ReactNode } from "react";
import type { z } from "zod";

import { DashboardActivityFeed } from "../components/dashboard-activity-feed";
import { DashboardAlertList } from "../components/dashboard-alert-list";
import { DashboardChartCard } from "../components/dashboard-chart-card";
import { DashboardDataTable } from "../components/dashboard-data-table";
import { DashboardProgressList } from "../components/dashboard-progress-list";
import { DashboardSectionHeader } from "../components/dashboard-section-header";
import { DashboardStatCard } from "../components/dashboard-stat-card";
import { DashboardStatusBadge } from "../components/dashboard-status-badge";
import { dashboardElementSchema, dashboardStateSchema } from "./schemas";
import type { DashboardElementType } from "./types";

type ParsedDashboardElement = z.infer<typeof dashboardElementSchema>;

type DashboardRendererRegistry = {
  [Type in DashboardElementType]: (
    props: Extract<ParsedDashboardElement, { type: Type }>["props"],
  ) => ReactNode;
};

const dashboardRegistry: DashboardRendererRegistry = {
  ActivityFeed: (props) => <DashboardActivityFeed {...props} />,
  AlertList: (props) => <DashboardAlertList {...props} />,
  ChartCard: (props) => <DashboardChartCard {...props} />,
  DataTable: (props) => <DashboardDataTable {...props} />,
  ProgressList: (props) => <DashboardProgressList {...props} />,
  SectionHeader: (props) => <DashboardSectionHeader {...props} />,
  StatCard: (props) => <DashboardStatCard {...props} />,
  StatusBadge: (props) => <DashboardStatusBadge {...props} />,
};

function getValidationIssues(element: unknown): string {
  const parsed = dashboardElementSchema.safeParse(element);
  if (parsed.success) {
    return "";
  }

  return parsed.error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");
}

export function safeParseDashboardState(rawState: unknown) {
  return dashboardStateSchema.safeParse(rawState);
}

export function renderDashboardElement(element: unknown): ReactNode {
  const parsed = dashboardElementSchema.safeParse(element);

  if (!parsed.success) {
    return (
      <div className="rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
        Invalid dashboard element: {getValidationIssues(element)}
      </div>
    );
  }

  const registryEntry = dashboardRegistry[parsed.data.type];

  if (!registryEntry) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
        Unsupported dashboard element type: {parsed.data.type}
      </div>
    );
  }

  return registryEntry(parsed.data.props as never);
}

export function renderDashboardElements(elements: unknown[]): ReactNode[] {
  return elements.map((element, index) => {
    const parsedElement = dashboardElementSchema.safeParse(element);

    return (
      <div
        key={parsedElement.success ? parsedElement.data.id : `invalid-${index}`}
      >
        {renderDashboardElement(element)}
      </div>
    );
  });
}
