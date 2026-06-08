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
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [replacedDocId, setReplacedDocId] = useState<string | null>(null);

  if (isLoading) return <LoadingState label="Loading re-upload flow..." />;
  if (isError || !data) return <ErrorState title="Unable to load re-upload flow" onRetry={() => window.location.reload()} />;

  const handleReupload = (docId: string) => {
    if (!selectedFiles[docId]) return;
    setReplacedDocId(null);

    [25, 55, 85, 100].forEach((value, index) => {
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [docId]: value }));
        if (value === 100) setReplacedDocId(docId);
      }, 250 * (index + 1));
    });
  };

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
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSelectedFiles((prev) => ({ ...prev, [doc.id]: file }));
                    setUploadProgress((prev) => ({ ...prev, [doc.id]: 0 }));
                    setReplacedDocId(null);
                  }}
                  className="block w-full max-w-xs text-xs text-slate-600 file:mr-3 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-50"
                />
                <Button onClick={() => handleReupload(doc.id)} disabled={!selectedFiles[doc.id]}>
                  Replace Rejected Document
                </Button>
              </div>
              {uploadProgress[doc.id] ? (
                <p className="text-xs text-slate-600">Upload progress: {uploadProgress[doc.id]}%</p>
              ) : null}
              {replacedDocId === doc.id ? (
                <p className="text-xs text-emerald-700">Replacement uploaded and reviewer notified.</p>
              ) : null}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
