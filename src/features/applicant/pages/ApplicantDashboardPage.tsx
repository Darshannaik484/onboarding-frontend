import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useApplicantDashboardQuery } from "../hooks/useApplicantPortalQueries";

const priorityVariant = {
  low: "secondary",
  medium: "warning",
  high: "error",
} as const;

export default function ApplicantDashboardPage() {
  const { data, isLoading, isError } = useApplicantDashboardQuery();

  if (isLoading) return <LoadingState label="Loading applicant dashboard..." />;
  if (isError || !data) {
    return <ErrorState title="Unable to load applicant dashboard" onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">Applicant Dashboard</h2>
        <Link
          to="/portal/applicant/kyc-status"
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          View KYC Status
        </Link>
      </div>

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

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Onboarding Progress Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.progressSummary.length === 0 ? (
              <EmptyState message="No onboarding progress available." />
            ) : (
              data.progressSummary.map((item) => (
                <Progress
                  key={item.stage}
                  label={item.stage}
                  value={item.progressPercent}
                  showPercentage
                  variant={item.progressPercent > 79 ? "success" : item.progressPercent > 49 ? "warning" : "primary"}
                />
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.pendingActions.length === 0 ? (
              <EmptyState message="No pending actions." />
            ) : (
              data.pendingActions.map((action) => (
                <div key={action.id} className="rounded-md border border-slate-200 p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">{action.title}</p>
                    <Badge variant={priorityVariant[action.priority]}>{action.priority.toUpperCase()}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">Due: {action.dueDate}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentActivity.length === 0 ? (
            <EmptyState message="No recent activity." />
          ) : (
            <div className="space-y-3">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="border-l-2 border-slate-200 pl-4">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <p className="text-sm text-slate-600">{activity.description}</p>
                  <p className="text-xs text-slate-500">{new Date(activity.occurredAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
