import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useSlaMetricsQuery } from "../hooks/useAdminPortalQueries";

const slaVariant = {
  healthy: "success",
  warning: "warning",
  breach: "error",
} as const;

export default function SlaMonitoringPage() {
  const { data, isLoading, isError } = useSlaMetricsQuery();

  if (isLoading) return <LoadingState label="Loading SLA metrics..." />;
  if (isError || !data) return <ErrorState title="Unable to load SLA metrics" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">SLA Monitoring Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No SLA metrics available." />
        ) : (
          <div className="space-y-3">
            {data.map((metric) => (
              <div key={metric.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{metric.metricName}</p>
                  <Badge variant={slaVariant[metric.status]}>{metric.status}</Badge>
                </div>
                <p className="text-xs text-slate-500">Target: {metric.target}</p>
                <p className="text-sm text-slate-700">Current: {metric.current}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
