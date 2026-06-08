import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useDocumentStatusesQuery } from "../hooks/useApplicantPortalQueries";

const statusVariant = {
  uploaded: "info",
  pending_review: "warning",
  approved: "success",
  rejected: "error",
  reupload_required: "error",
} as const;

const statusLabel = {
  uploaded: "Uploaded",
  pending_review: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
  reupload_required: "Re-upload Required",
} as const;

export default function DocumentStatusPage() {
  const { data, isLoading, isError } = useDocumentStatusesQuery();

  if (isLoading) return <LoadingState label="Loading document statuses..." />;
  if (isError || !data) return <ErrorState title="Unable to load document statuses" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Document Status</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No document statuses available." />
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.documentName}</p>
                  <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge>
                </div>
                <p className="text-xs text-slate-500">Last updated: {new Date(item.updatedAt).toLocaleString()}</p>
                {item.reviewerComment ? <p className="mt-2 text-xs text-red-600">{item.reviewerComment}</p> : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
