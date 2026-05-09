import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { DashboardSummary } from "../../types/dashboard";
import { useTranslation } from "react-i18next";

interface DashboardSummaryCardsProps {
  summary: DashboardSummary;
}

export const DashboardSummaryCards = ({ summary }: DashboardSummaryCardsProps) => {
  const { t } = useTranslation();
  const items = [
    { label: t("dashboard.totalClients"), value: summary.totalClients },
    { label: t("dashboard.completed"), value: summary.completedOnboarding },
    { label: t("dashboard.inProgress"), value: summary.inProgressOnboarding },
    { label: t("dashboard.blocked"), value: summary.blockedOnboarding },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
