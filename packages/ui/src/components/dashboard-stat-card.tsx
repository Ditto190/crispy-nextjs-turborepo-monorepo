import { cn } from "@monorepo/utils/styles";

import type { StatCardProps } from "../dashboard/types";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

const trendColorMap = {
  down: "text-destructive",
  neutral: "text-muted-foreground",
  up: "text-green-600 dark:text-green-400",
} as const;

export function DashboardStatCard({
  title,
  trend,
  trendDirection = "neutral",
  value,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <p
            className={cn(
              "mt-1 text-xs font-medium",
              trendColorMap[trendDirection],
            )}
          >
            {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
