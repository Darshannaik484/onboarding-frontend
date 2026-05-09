import { Link } from "react-router-dom";
import { ActivityTimeline } from "../../../components/dashboard/ActivityTimeline";
import { ClientSummaryCard } from "../../../components/dashboard/ClientSummaryCard";
import { DashboardSummaryCards } from "../../../components/dashboard/DashboardSummaryCards";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { EmptyState } from "../../../components/common/EmptyState";
import {
  useDashboardActivityQuery,
  useDashboardClientsQuery,
  useDashboardSummaryQuery,
} from "../hooks/useDashboardQueries";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const summaryQuery = useDashboardSummaryQuery();
  const clientsQuery = useDashboardClientsQuery();
  const activityQuery = useDashboardActivityQuery();
  const isLoading = summaryQuery.isLoading || clientsQuery.isLoading || activityQuery.isLoading;
  const hasError = summaryQuery.isError || clientsQuery.isError || activityQuery.isError;

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
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {t("common.refresh")}
            </Link>
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
    </div>
  );
}
