import type { ActivityItem } from "../../types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../common/EmptyState";

interface ActivityTimelineProps {
  items: ActivityItem[];
}

export const ActivityTimeline = ({ items }: ActivityTimelineProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("dashboard.recentActivity")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length === 0 ? (
            <EmptyState message={t("dashboard.noRecentActivity")} />
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
};
