import type { ActivityFeedProps } from "../dashboard/types";

export function DashboardActivityFeed({ items, title }: ActivityFeedProps) {
  return (
    <section className="rounded-lg border bg-card p-4">
      {title ? <h3 className="mb-4 font-semibold">{title}</h3> : null}
      <ol className="relative ml-2 space-y-4 border-l pl-6">
        {items.map((item) => (
          <li className="space-y-1" key={item.id}>
            <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            <p className="text-sm">
              <span className="font-semibold">{item.actor}</span> {item.action}
              {item.target ? (
                <span className="font-medium text-primary"> {item.target}</span>
              ) : null}
            </p>
            <time className="text-xs text-muted-foreground">
              {item.timestamp}
            </time>
          </li>
        ))}
      </ol>
    </section>
  );
}
