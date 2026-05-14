export type StatCardProps = {
  title: string;
  value: number | string;
  trend?: string;
  trendDirection?: "down" | "neutral" | "up";
};

export type DataTableProps = {
  columns: string[];
  data: Record<string, unknown>[];
};

export type ChartCardProps = {
  title: string;
  chartType: "bar" | "line" | "pie";
  data: Record<string, unknown>[];
};

export type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: string;
};

export type StatusBadgeProps = {
  label: string;
  status: "error" | "info" | "neutral" | "success" | "warning";
  description?: string;
};

export type ActivityFeedItem = {
  id: string;
  actor: string;
  action: string;
  target?: string;
  timestamp: string;
  icon?: string;
};

export type ActivityFeedProps = {
  title?: string;
  items: ActivityFeedItem[];
};

export type ProgressItem = {
  id: string;
  label: string;
  percent: number;
  status?: "at_risk" | "blocked" | "complete" | "on_track";
};

export type ProgressListProps = {
  title?: string;
  items: ProgressItem[];
};

export type AlertItem = {
  id: string;
  severity: "critical" | "high" | "info" | "low" | "medium";
  title: string;
  message?: string;
  timestamp?: string;
};

export type AlertListProps = {
  title?: string;
  items: AlertItem[];
};

export type DashboardElement =
  | { id: string; type: "ActivityFeed"; props: ActivityFeedProps }
  | { id: string; type: "AlertList"; props: AlertListProps }
  | { id: string; type: "ChartCard"; props: ChartCardProps }
  | { id: string; type: "DataTable"; props: DataTableProps }
  | { id: string; type: "ProgressList"; props: ProgressListProps }
  | { id: string; type: "SectionHeader"; props: SectionHeaderProps }
  | { id: string; type: "StatCard"; props: StatCardProps }
  | { id: string; type: "StatusBadge"; props: StatusBadgeProps };

export type DashboardElementType = DashboardElement["type"];

export type DashboardState = {
  elements: DashboardElement[];
};
