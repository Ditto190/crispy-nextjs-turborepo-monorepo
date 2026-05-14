import { z } from "zod";

export const statCardPropsSchema = z.object({
  title: z.string().min(1),
  value: z.union([z.string(), z.number()]),
  trend: z.string().optional(),
  trendDirection: z.enum(["down", "neutral", "up"]).optional(),
});

export const dataTablePropsSchema = z.object({
  columns: z.array(z.string()).min(1),
  data: z.array(z.record(z.string(), z.unknown())),
});

export const chartCardPropsSchema = z.object({
  title: z.string().min(1),
  chartType: z.enum(["bar", "line", "pie"]),
  data: z.array(z.record(z.string(), z.unknown())).min(1),
});

export const sectionHeaderPropsSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
});

export const statusBadgePropsSchema = z.object({
  label: z.string().min(1),
  status: z.enum(["error", "info", "neutral", "success", "warning"]),
  description: z.string().optional(),
});

const activityFeedItemSchema = z.object({
  id: z.string().min(1),
  actor: z.string().min(1),
  action: z.string().min(1),
  target: z.string().optional(),
  timestamp: z.string().min(1),
  icon: z.string().optional(),
});

export const activityFeedPropsSchema = z.object({
  title: z.string().optional(),
  items: z.array(activityFeedItemSchema).min(1),
});

const progressItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  percent: z.number().min(0).max(100),
  status: z.enum(["at_risk", "blocked", "complete", "on_track"]).optional(),
});

export const progressListPropsSchema = z.object({
  title: z.string().optional(),
  items: z.array(progressItemSchema).min(1),
});

const alertItemSchema = z.object({
  id: z.string().min(1),
  severity: z.enum(["critical", "high", "info", "low", "medium"]),
  title: z.string().min(1),
  message: z.string().optional(),
  timestamp: z.string().optional(),
});

export const alertListPropsSchema = z.object({
  title: z.string().optional(),
  items: z.array(alertItemSchema).min(1),
});

export const dashboardElementSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().min(1),
    type: z.literal("StatCard"),
    props: statCardPropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("DataTable"),
    props: dataTablePropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("ChartCard"),
    props: chartCardPropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("SectionHeader"),
    props: sectionHeaderPropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("StatusBadge"),
    props: statusBadgePropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("ActivityFeed"),
    props: activityFeedPropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("ProgressList"),
    props: progressListPropsSchema,
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal("AlertList"),
    props: alertListPropsSchema,
  }),
]);

export const dashboardStateSchema = z.object({
  elements: z.array(dashboardElementSchema),
});
