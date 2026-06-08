import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useCorrectionFieldsQuery } from "../hooks/useAdminPortalQueries";

export default function FieldCorrectionPage() {
  const [searchParams] = useSearchParams();
  const { data = [], isLoading, isError } = useCorrectionFieldsQuery();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const reviewId = searchParams.get("reviewId");

  const hasValidationIssues = useMemo(
    () =>
      data.some(
        (item) =>
          item.validationMessage &&
          (values[item.id] ?? item.correctedValue).trim().length === 0,
      ),
    [data, values],
  );

  if (isLoading) return <LoadingState label="Loading correction fields..." />;
  if (isError) return <ErrorState title="Unable to load field corrections" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Field Correction Screen</CardTitle>
        {reviewId ? <p className="text-xs text-slate-500">Review reference: {reviewId}</p> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <EmptyState message="No fields require correction." />
        ) : (
          data.map((field) => (
            <div key={field.id} className="space-y-2 rounded-md border border-slate-200 p-3">
              <Label>{field.fieldName}</Label>
              <p className="text-xs text-slate-500">Current value: {field.currentValue}</p>
              <Input
                value={values[field.id] ?? field.correctedValue}
                onChange={(event) => {
                  setSaved(false);
                  setValues((prev) => ({ ...prev, [field.id]: event.target.value }));
                }}
              />
              {field.validationMessage ? <p className="text-xs text-amber-700">{field.validationMessage}</p> : null}
            </div>
          ))
        )}

        <div className="flex items-center gap-2">
          <Button onClick={() => setSaved(true)} disabled={hasValidationIssues || data.length === 0}>
            Save / Update
          </Button>
          {saved ? <p className="text-xs text-emerald-700">Corrections saved successfully.</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
