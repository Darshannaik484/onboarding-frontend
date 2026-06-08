import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useHumanReviewDashboardQuery } from "../hooks/useAdminPortalQueries";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useHumanReviewDashboardQuery();
  const portalLinks = [
    { to: "/portal/admin/review-queue", label: "Review Queue", description: "Open pending human reviews" },
    { to: "/portal/admin/document-viewer", label: "Document Viewer", description: "Inspect uploaded documents" },
    { to: "/portal/admin/field-corrections", label: "Field Corrections", description: "Update flagged data fields" },
    { to: "/portal/admin/reconciliation", label: "Reconciliation", description: "Resolve system mismatches" },
    { to: "/portal/admin/crm-sync", label: "CRM Sync", description: "Track sync failures and retries" },
    { to: "/portal/admin/sla-monitoring", label: "SLA Monitoring", description: "Monitor operational SLAs" },
    { to: "/portal/admin/escalations", label: "Escalations", description: "Handle escalated cases" },
    { to: "/portal/admin/analytics", label: "Analytics", description: "View onboarding performance" },
  ];

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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Admin Portal Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {portalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="rounded-md border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50">
                <p className="text-sm font-medium text-slate-900">{link.label}</p>
                <p className="mt-1 text-xs text-slate-500">{link.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
