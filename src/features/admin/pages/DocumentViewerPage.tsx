import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { useUiStore } from "../../../store/ui.store";
import { useReviewQueueQuery } from "../hooks/useAdminPortalQueries";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";

export default function DocumentViewerPage() {
  const [searchParams] = useSearchParams();
  const zoom = useUiStore((state) => state.documentViewerZoom);
  const setZoom = useUiStore((state) => state.setDocumentViewerZoom);
  const { data = [], isLoading, isError } = useReviewQueueQuery();
  const [decision, setDecision] = useState<"approved" | "correction_requested" | "rejected" | null>(null);

  const selectedReview = useMemo(() => {
    const reviewId = searchParams.get("reviewId");
    if (!reviewId) return data[0] ?? null;
    return data.find((item) => item.id === reviewId) ?? null;
  }, [data, searchParams]);

  if (isLoading) return <LoadingState label="Loading document viewer..." />;
  if (isError) return <ErrorState title="Unable to load document preview" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-lg">Document Viewer</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setZoom(Math.max(50, zoom - 10))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600">{zoom}%</span>
          <Button variant="outline" onClick={() => setZoom(Math.min(200, zoom + 10))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedReview ? (
          <EmptyState message="No document selected for review." />
        ) : (
          <>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-900">{selectedReview.documentName}</p>
              <p className="mt-1 text-xs text-slate-500">Applicant: {selectedReview.applicantName}</p>
              <p className="text-xs text-slate-500">Submitted: {new Date(selectedReview.submittedAt).toLocaleString()}</p>
            </div>

            <div className="flex h-96 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
              <div className="text-center" style={{ transform: `scale(${zoom / 100})` }}>
                <p className="text-sm font-medium text-slate-900">{selectedReview.documentName} preview</p>
                <p className="text-xs text-slate-500">Zoom controls apply to this viewport.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={selectedReview.status === "resolved" ? "success" : selectedReview.status === "in_review" ? "info" : "warning"}>
                {selectedReview.status.replace("_", " ")}
              </Badge>
              <Button onClick={() => setDecision("approved")}>Approve</Button>
              <Button variant="outline" onClick={() => setDecision("correction_requested")}>Request Correction</Button>
              <Button variant="outline" className="text-red-700" onClick={() => setDecision("rejected")}>Reject</Button>
              {decision ? (
                <p className="text-xs text-emerald-700">
                  Decision saved: {decision.replace("_", " ")}.
                </p>
              ) : null}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
