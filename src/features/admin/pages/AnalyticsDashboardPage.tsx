import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useAnalyticsDataQuery } from "../hooks/useAdminPortalQueries";

export default function AnalyticsDashboardPage() {
  const { data, isLoading, isError } = useAnalyticsDataQuery();

  if (isLoading) return <LoadingState label="Loading analytics..." />;
  if (isError || !data) return <ErrorState title="Unable to load analytics" onRetry={() => window.location.reload()} />;

  const hasSeries =
    data.onboardingByStage.length > 0 || data.approvalRates.length > 0 || data.documentProcessingTimes.length > 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Analytics Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-slate-900">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!hasSeries ? (
        <EmptyState message="No analytics data available." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Onboarding by Stage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.onboardingByStage.map((point) => (
                <div key={point.id} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>{point.label}</span>
                    <span>{point.value}%</span>
                  </div>
                  <div className="h-2 rounded bg-slate-200">
                    <div className="h-full rounded bg-blue-600" style={{ width: `${point.value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Approval Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.approvalRates.map((point) => (
                <div key={point.id} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
                  <span className="text-sm text-slate-700">{point.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{point.value}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Document Processing (mins)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.documentProcessingTimes.map((point) => (
                <div key={point.id} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>{point.label}</span>
                    <span>{point.value}m</span>
                  </div>
                  <div className="h-2 rounded bg-slate-200">
                    <div className="h-full rounded bg-emerald-600" style={{ width: `${Math.min((point.value / 30) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
