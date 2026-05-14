import type { SectionHeaderProps } from "../dashboard/types";

import { Badge } from "./badge";

export function DashboardSectionHeader({
  badge,
  subtitle,
  title,
}: SectionHeaderProps) {
  return (
    <header className="space-y-2 border-b pb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {badge ? <Badge variant="outline">{badge}</Badge> : null}
      </div>
      {subtitle ? (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}
