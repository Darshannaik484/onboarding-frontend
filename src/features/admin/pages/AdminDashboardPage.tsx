import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useHumanReviewDashboardQuery } from "../hooks/useAdminPortalQueries";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useHumanReviewDashboardQuery();

  if (isLoading) return <LoadingState label="Loading admin dashboard..." />;
  if (isError || !data) return <ErrorState title="Unable to load admin dashboard" onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Human Review Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
              {metric.trend ? <p className="text-xs text-slate-500">{metric.trend}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reviewer Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {data.reviewerActivity.length === 0 ? (
            <EmptyState message="No reviewer activity available." />
          ) : (
            <div className="space-y-3">
              {data.reviewerActivity.map((item) => (
                <div key={item.id} className="rounded-md border border-slate-200 p-3">
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                  <p className="text-xs text-slate-500">{new Date(item.occurredAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
