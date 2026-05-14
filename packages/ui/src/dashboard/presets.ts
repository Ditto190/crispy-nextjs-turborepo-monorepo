import type { DashboardState } from "./types";

export const projectManagementDashboardPreset: DashboardState = {
  elements: [
    {
      id: "section_q2",
      type: "SectionHeader",
      props: {
        title: "Q2 Delivery Dashboard",
        subtitle: "Operational view of milestones, blockers, and team activity",
        badge: "Sprint 14",
      },
    },
    {
      id: "stat_velocity",
      type: "StatCard",
      props: {
        title: "Velocity",
        value: "48 pts",
        trend: "+6 pts vs last sprint",
        trendDirection: "up",
      },
    },
    {
      id: "stat_bugs",
      type: "StatCard",
      props: {
        title: "Open blockers",
        value: 3,
        trend: "-2 this week",
        trendDirection: "down",
      },
    },
    {
      id: "status_release",
      type: "StatusBadge",
      props: {
        label: "Release train healthy",
        status: "success",
        description: "No unresolved P0 incidents",
      },
    },
    {
      id: "progress_epics",
      type: "ProgressList",
      props: {
        title: "Epic progress",
        items: [
          {
            id: "epic_auth",
            label: "Auth hardening",
            percent: 80,
            status: "on_track",
          },
          {
            id: "epic_ai",
            label: "AI summaries",
            percent: 55,
            status: "at_risk",
          },
          {
            id: "epic_mobile",
            label: "Mobile parity",
            percent: 30,
            status: "blocked",
          },
        ],
      },
    },
    {
      id: "alerts",
      type: "AlertList",
      props: {
        title: "Active alerts",
        items: [
          {
            id: "alert_1",
            severity: "critical",
            title: "Payments migration blocked",
            message: "Third-party sandbox outage affecting integration tests",
            timestamp: "2026-05-14 13:10 UTC",
          },
          {
            id: "alert_2",
            severity: "medium",
            title: "Design review pending",
            message: "Dashboard navigation spec awaiting UX sign-off",
            timestamp: "2026-05-14 11:45 UTC",
          },
        ],
      },
    },
    {
      id: "activity",
      type: "ActivityFeed",
      props: {
        title: "Recent activity",
        items: [
          {
            id: "activity_1",
            actor: "Alex",
            action: "merged",
            target: "dashboard-safe registry",
            timestamp: "8m ago",
          },
          {
            id: "activity_2",
            actor: "Mina",
            action: "updated",
            target: "sprint scope",
            timestamp: "23m ago",
          },
        ],
      },
    },
    {
      id: "team_table",
      type: "DataTable",
      props: {
        columns: ["Owner", "Area", "Status"],
        data: [
          { Owner: "Alex", Area: "API", Status: "On track" },
          { Owner: "Mina", Area: "Frontend", Status: "At risk" },
          { Owner: "Sam", Area: "Infra", Status: "Blocked" },
        ],
      },
    },
    {
      id: "throughput_chart",
      type: "ChartCard",
      props: {
        title: "Weekly throughput",
        chartType: "line",
        data: [
          { week: "W1", completed: 18 },
          { week: "W2", completed: 21 },
          { week: "W3", completed: 24 },
        ],
      },
    },
  ],
};
