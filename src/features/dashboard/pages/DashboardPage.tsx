import { Link } from "react-router-dom";
import { ActivityTimeline } from "../../../components/dashboard/ActivityTimeline";
import { ClientSummaryCard } from "../../../components/dashboard/ClientSummaryCard";
import { DashboardSummaryCards } from "../../../components/dashboard/DashboardSummaryCards";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  useDashboardActivityQuery,
  useDashboardClientsQuery,
  useDashboardSummaryQuery,
} from "../hooks/useDashboardQueries";

export default function DashboardPage() {
  const summaryQuery = useDashboardSummaryQuery();
  const clientsQuery = useDashboardClientsQuery();
  const activityQuery = useDashboardActivityQuery();
  const isLoading = summaryQuery.isLoading || clientsQuery.isLoading || activityQuery.isLoading;
  const hasError = summaryQuery.isError || clientsQuery.isError || activityQuery.isError;

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading dashboard...</p>;
  }

  if (hasError || !summaryQuery.data || !clientsQuery.data || !activityQuery.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Unable to load dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-slate-600">
            Please try refreshing the page or check your network connection.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardSummaryCards summary={summaryQuery.data} />

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="space-y-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Clients</h2>
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Refresh
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {clientsQuery.data.map((client) => (
              <ClientSummaryCard key={client.id} client={client} />
            ))}
          </div>
        </section>

        <ActivityTimeline items={activityQuery.data} />
      </div>
    </div>
  );
}
