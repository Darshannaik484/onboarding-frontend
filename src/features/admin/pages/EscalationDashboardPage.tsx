import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useEscalationCasesQuery } from "../hooks/useAdminPortalQueries";

const priorityVariant = {
  P1: "error",
  P2: "warning",
  P3: "secondary",
} as const;

const statusVariant = {
  open: "error",
  assigned: "warning",
  resolved: "success",
} as const;

export default function EscalationDashboardPage() {
  const { data, isLoading, isError } = useEscalationCasesQuery();

  if (isLoading) return <LoadingState label="Loading escalations..." />;
  if (isError || !data) return <ErrorState title="Unable to load escalations" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Escalation Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No escalated cases." />
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.caseRef}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
                    <Badge variant={statusVariant[item.resolutionStatus]}>{item.resolutionStatus}</Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-700">{item.issue}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
