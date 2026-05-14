import { cn } from "@monorepo/utils/styles";

import type { ProgressItem, ProgressListProps } from "../dashboard/types";

import { Progress } from "./progress";

const statusLabelMap: Record<NonNullable<ProgressItem["status"]>, string> = {
  at_risk: "At risk",
  blocked: "Blocked",
  complete: "Complete",
  on_track: "On track",
};

const statusTextClassMap: Record<
  NonNullable<ProgressItem["status"]>,
  string
> = {
  at_risk: "text-amber-700 dark:text-amber-300",
  blocked: "text-destructive",
  complete: "text-primary",
  on_track: "text-green-700 dark:text-green-300",
};

export function DashboardProgressList({ items, title }: ProgressListProps) {
  return (
    <section className="rounded-lg border bg-card p-4">
      {title ? <h3 className="mb-4 font-semibold">{title}</h3> : null}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <div className="mb-1 flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="inline-flex gap-2 text-xs">
                {item.status ? (
                  <span
                    className={cn(
                      "font-semibold",
                      statusTextClassMap[item.status],
                    )}
                  >
                    {statusLabelMap[item.status]}
                  </span>
                ) : null}
                <span className="text-muted-foreground">{item.percent}%</span>
              </span>
            </div>
            <Progress value={item.percent} />
          </li>
        ))}
      </ul>
    </section>
  );
}
