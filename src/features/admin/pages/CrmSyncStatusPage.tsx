import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { useCrmSyncItemsQuery } from "../hooks/useAdminPortalQueries";

const syncVariant = {
  synced: "success",
  failed: "error",
  retrying: "warning",
} as const;

export default function CrmSyncStatusPage() {
  const { data, isLoading, isError } = useCrmSyncItemsQuery();
  const [retryingId, setRetryingId] = useState<string | null>(null);

  if (isLoading) return <LoadingState label="Loading CRM sync status..." />;
  if (isError || !data) return <ErrorState title="Unable to load CRM sync status" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">CRM Sync Status Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No CRM sync items available." />
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.entityName}</p>
                  <Badge variant={retryingId === item.id ? "warning" : syncVariant[item.syncStatus]}>
                    {retryingId === item.id ? "retrying" : item.syncStatus}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">Last attempt: {new Date(item.lastAttemptAt).toLocaleString()}</p>
                {item.failureReason ? <p className="mt-2 text-xs text-red-600">{item.failureReason}</p> : null}
                {item.syncStatus === "failed" ? (
                  <Button
                    className="mt-3"
                    variant="outline"
                    onClick={() => setRetryingId(item.id)}
                  >
                    Retry Sync
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
