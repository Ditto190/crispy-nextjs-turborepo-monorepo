import type { ChartCardProps } from "../dashboard/types";

import { Badge } from "./badge";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export function DashboardChartCard({ chartType, data, title }: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge className="uppercase" variant="secondary">
          {chartType}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Chart placeholder for {data.length} points
        </div>
      </CardContent>
    </Card>
  );
}
