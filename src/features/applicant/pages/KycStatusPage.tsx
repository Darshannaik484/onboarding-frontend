import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useKycStagesQuery } from "../hooks/useApplicantPortalQueries";

const stageVariant = {
  completed: "success",
  in_progress: "warning",
  pending: "secondary",
  blocked: "error",
} as const;

export default function KycStatusPage() {
  const { data, isLoading, isError } = useKycStagesQuery();

  if (isLoading) return <LoadingState label="Loading KYC status..." />;
  if (isError || !data) return <ErrorState title="Unable to load KYC status" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">KYC Status</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No KYC stages available." />
        ) : (
          <div className="space-y-3">
            {data.map((stage, index) => (
              <div key={stage.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400" />
                  {index < data.length - 1 ? <div className="mt-1 h-10 w-px bg-slate-200" /> : null}
                </div>
                <div className="w-full rounded-md border border-slate-200 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">{stage.stageName}</p>
                    <Badge variant={stageVariant[stage.status]}>{stage.status.replace("_", " ")}</Badge>
                  </div>
                  {stage.completedAt ? (
                    <p className="text-xs text-slate-500">Completed on {stage.completedAt}</p>
                  ) : (
                    <p className="text-xs text-slate-500">Awaiting completion</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
