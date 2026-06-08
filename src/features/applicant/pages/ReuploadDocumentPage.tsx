import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useReuploadDocumentsQuery } from "../hooks/useApplicantPortalQueries";

export default function ReuploadDocumentPage() {
  const { data, isLoading, isError } = useReuploadDocumentsQuery();
  const [replacedDocId, setReplacedDocId] = useState<string | null>(null);

  if (isLoading) return <LoadingState label="Loading re-upload flow..." />;
  if (isError || !data) return <ErrorState title="Unable to load re-upload flow" onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <EmptyState message="No documents require re-upload." />
      ) : (
        data.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="text-lg">{doc.documentName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="error">Re-upload Required</Badge>
                <p className="text-xs text-slate-600">{doc.notification}</p>
              </div>

              <div className="rounded-md border border-slate-200 p-3">
                <p className="mb-2 text-sm font-medium text-slate-900">Version history</p>
                <div className="space-y-2">
                  {doc.versions.map((version) => (
                    <div key={`${doc.id}-${version.version}`} className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-slate-600">
                        v{version.version} · {new Date(version.uploadedAt).toLocaleString()} · {version.note}
                      </p>
                      <Badge variant={version.status === "approved" ? "success" : "warning"}>
                        {version.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => setReplacedDocId(doc.id)}>Replace Rejected Document</Button>
                {replacedDocId === doc.id ? (
                  <p className="text-xs text-emerald-700">Replacement queued and notification sent.</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
