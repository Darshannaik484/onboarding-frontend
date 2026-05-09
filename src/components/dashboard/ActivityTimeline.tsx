import type { ActivityItem } from "../../types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ActivityTimelineProps {
  items: ActivityItem[];
}

export const ActivityTimeline = ({ items }: ActivityTimelineProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">No recent activity.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="border-l-2 border-slate-200 pl-4">
              <p className="text-sm font-medium text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-600">{item.description}</p>
              <p className="mt-1 text-xs text-slate-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </CardContent>
  </Card>
);
