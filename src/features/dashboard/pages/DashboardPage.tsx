import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityTimeline } from "../../../components/dashboard/ActivityTimeline";
import { ClientSummaryCard } from "../../../components/dashboard/ClientSummaryCard";
import { DashboardSummaryCards } from "../../../components/dashboard/DashboardSummaryCards";
import { NewClientModal } from "../../../components/dashboard/NewClientModal";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { EmptyState } from "../../../components/common/EmptyState";
import {
  useDashboardActivityQuery,
  useDashboardClientsQuery,
  useCreateClientMutation,
  useDashboardSummaryQuery,
} from "../hooks/useDashboardQueries";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";
import type { CreateClientFormValues } from "../createClient.schema";

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const summaryQuery = useDashboardSummaryQuery();
  const clientsQuery = useDashboardClientsQuery();
  const activityQuery = useDashboardActivityQuery();
  const createClientMutation = useCreateClientMutation();
  const isLoading = summaryQuery.isLoading || clientsQuery.isLoading || activityQuery.isLoading;
  const hasError = summaryQuery.isError || clientsQuery.isError || activityQuery.isError;

  const handleCreateClient = async (values: CreateClientFormValues) => {
    const createdClient = await createClientMutation.mutateAsync(values);
    setIsNewClientModalOpen(false);
    navigate(`/clients/${createdClient.id}`, {
      state: { createdClientName: createdClient.name },
    });
  };

  if (isLoading) {
    return <LoadingState label={t("dashboard.loading")} />;
  }

  if (hasError || !summaryQuery.data || !clientsQuery.data || !activityQuery.data) {
    return (
      <ErrorState
        title={t("dashboard.loadErrorTitle")}
        description={t("dashboard.loadErrorDescription")}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <DashboardSummaryCards summary={summaryQuery.data} />

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="space-y-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{t("dashboard.clients")}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => window.location.reload()}>
                {t("common.refresh")}
              </Button>
              <Button onClick={() => setIsNewClientModalOpen(true)}>{t("dashboard.newClient")}</Button>
            </div>
          </div>
          {clientsQuery.data.length === 0 ? (
            <EmptyState message={t("states.noData")} />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {clientsQuery.data.map((client) => (
                <ClientSummaryCard key={client.id} client={client} />
              ))}
            </div>
          )}
        </section>

        <ActivityTimeline items={activityQuery.data} />
      </div>

      <NewClientModal
        open={isNewClientModalOpen}
        onClose={() => setIsNewClientModalOpen(false)}
        onSubmit={handleCreateClient}
        isSubmitting={createClientMutation.isPending}
        errorMessage={createClientMutation.error ? (createClientMutation.error as Error).message : undefined}
      />
    </div>
  );
}
