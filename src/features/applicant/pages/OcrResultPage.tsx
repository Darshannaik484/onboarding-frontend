import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useOcrResultsQuery } from "../hooks/useApplicantPortalQueries";

export default function OcrResultPage() {
  const { data, isLoading, isError } = useOcrResultsQuery();

  if (isLoading) return <LoadingState label="Loading OCR results..." />;
  if (isError || !data) return <ErrorState title="Unable to load OCR results" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">OCR Result Display</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No OCR fields available." />
        ) : (
          <div className="space-y-4">
            {data.map((field) => (
              <div key={field.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{field.fieldName}</p>
                  {field.validationIssue ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                      <AlertTriangle className="h-3.5 w-3.5" /> Validation issue
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-700">Validated</span>
                  )}
                </div>
                <p className="mb-2 text-sm text-slate-700">{field.extractedValue}</p>
                <Progress
                  label="Confidence score"
                  value={field.confidenceScore}
                  showPercentage
                  variant={field.confidenceScore >= 90 ? "success" : field.confidenceScore >= 75 ? "warning" : "error"}
                />
                {field.validationIssue ? <p className="mt-2 text-xs text-amber-700">{field.validationIssue}</p> : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
