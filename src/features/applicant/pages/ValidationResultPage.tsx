import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useValidationResultsQuery } from "../hooks/useApplicantPortalQueries";

export default function ValidationResultPage() {
  const { data, isLoading, isError } = useValidationResultsQuery();

  if (isLoading) return <LoadingState label="Loading validation results..." />;
  if (isError || !data) {
    return <ErrorState title="Unable to load validation results" onRetry={() => window.location.reload()} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Validation Result Screen</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No validation results available." />
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.fieldName}</p>
                  <Badge variant={item.status === "valid" ? "success" : "error"}>
                    {item.status === "valid" ? "Valid" : "Invalid"}
                  </Badge>
                </div>
                {item.errorDetails ? <p className="text-sm text-red-600">{item.errorDetails}</p> : null}
                {item.suggestedCorrection ? (
                  <p className="mt-1 text-xs text-slate-600">Suggested correction: {item.suggestedCorrection}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
