import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useUploadTrackingQuery } from "../hooks/useApplicantPortalQueries";

const stateVariant = {
  in_progress: "info",
  success: "success",
  failed: "error",
} as const;

export default function UploadTrackingPage() {
  const { data, isLoading, isError } = useUploadTrackingQuery();

  if (isLoading) return <LoadingState label="Loading upload tracking..." />;
  if (isError || !data) return <ErrorState title="Unable to load upload tracking" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload Progress Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No uploads available." />
        ) : (
          <div className="space-y-4">
            {data.map((upload) => (
              <div key={upload.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{upload.fileName}</p>
                  <Badge variant={stateVariant[upload.state]}>{upload.state.replace("_", " ")}</Badge>
                </div>
                <Progress
                  value={upload.progressPercent}
                  showPercentage
                  animated={upload.state === "in_progress"}
                  variant={upload.state === "success" ? "success" : upload.state === "failed" ? "error" : "primary"}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
