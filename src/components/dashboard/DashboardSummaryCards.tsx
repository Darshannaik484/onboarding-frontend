import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { DashboardSummary } from "../../types/dashboard";

interface DashboardSummaryCardsProps {
  summary: DashboardSummary;
}

export const DashboardSummaryCards = ({ summary }: DashboardSummaryCardsProps) => {
  const items = [
    { label: "Total Clients", value: summary.totalClients },
    { label: "Completed", value: summary.completedOnboarding },
    { label: "In Progress", value: summary.inProgressOnboarding },
    { label: "Blocked", value: summary.blockedOnboarding },
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
