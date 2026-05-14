import { cn } from "@monorepo/utils/styles";

import type { AlertItem, AlertListProps } from "../dashboard/types";

import { Badge } from "./badge";

const severityLabelMap: Record<AlertItem["severity"], string> = {
  critical: "Critical",
  high: "High",
  info: "Info",
  low: "Low",
  medium: "Medium",
};

const severityClassMap: Record<AlertItem["severity"], string> = {
  critical: "border-destructive/40 bg-destructive/10",
  high: "border-orange-500/40 bg-orange-500/10",
  info: "border-blue-500/40 bg-blue-500/10",
  low: "border-slate-500/40 bg-slate-500/10",
  medium: "border-amber-500/40 bg-amber-500/10",
};

export function DashboardAlertList({ items, title }: AlertListProps) {
  return (
    <section className="rounded-lg border bg-card p-4">
      {title ? <h3 className="mb-4 font-semibold">{title}</h3> : null}
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            className={cn(
              "space-y-1 rounded-md border p-3",
              severityClassMap[item.severity],
            )}
            key={item.id}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{item.title}</p>
              <Badge variant="outline">{severityLabelMap[item.severity]}</Badge>
            </div>
            {item.message ? (
              <p className="text-xs text-muted-foreground">{item.message}</p>
            ) : null}
            {item.timestamp ? (
              <time className="text-xs text-muted-foreground">
                {item.timestamp}
              </time>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
