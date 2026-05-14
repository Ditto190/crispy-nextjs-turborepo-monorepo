import { cn } from "@monorepo/utils/styles";

import type { StatusBadgeProps } from "../dashboard/types";

import { Badge } from "./badge";

const statusClassMap = {
  error: "bg-destructive/20 text-destructive border-destructive/40",
  info: "bg-blue-500/20 text-blue-700 border-blue-500/40 dark:text-blue-300",
  neutral: "bg-muted text-muted-foreground border-border",
  success:
    "bg-green-500/20 text-green-700 border-green-500/40 dark:text-green-300",
  warning:
    "bg-amber-500/20 text-amber-700 border-amber-500/40 dark:text-amber-300",
} as const;

export function DashboardStatusBadge({
  description,
  label,
  status,
}: StatusBadgeProps) {
  return (
    <div className="inline-flex flex-col gap-1">
      <Badge className={cn("border", statusClassMap[status])}>{label}</Badge>
      {description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
