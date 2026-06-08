import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useReconciliationItemsQuery } from "../hooks/useAdminPortalQueries";

const statusVariant = {
  open: "error",
  in_progress: "warning",
  resolved: "success",
} as const;

export default function ReconciliationDashboardPage() {
  const { data, isLoading, isError } = useReconciliationItemsQuery();

  if (isLoading) return <LoadingState label="Loading reconciliation dashboard..." />;
  if (isError || !data) return <ErrorState title="Unable to load reconciliation data" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Reconciliation Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No mismatches detected." />
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.fieldName}</p>
                  <Badge variant={statusVariant[item.resolutionStatus]}>{item.resolutionStatus.replace("_", " ")}</Badge>
                </div>
                <p className="text-sm text-slate-700">{item.mismatchDetail}</p>
                <p className="text-xs text-slate-500">Source: {item.sourceSystem}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
