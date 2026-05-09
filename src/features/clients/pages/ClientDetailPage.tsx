import { Link, useParams } from "react-router-dom";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useClientDetailQuery } from "../../onboarding/hooks/useOnboardingQueries";
import { useOnboardingStore } from "../../../store/onboarding.store";
import { useEffect } from "react";

export default function ClientDetailPage() {
  const { clientId = "" } = useParams();
  const setSelectedClient = useOnboardingStore((state) => state.setSelectedClient);
  const { data, isLoading, isError } = useClientDetailQuery(clientId);

  useEffect(() => {
    setSelectedClient(clientId || null);
  }, [clientId, setSelectedClient]);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading client details...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Unable to load client details.</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl">{data.name}</CardTitle>
          <StatusBadge status={data.status} />
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Contact Email</p>
            <p className="text-sm font-medium text-slate-900">{data.contactEmail}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Jurisdiction</p>
            <p className="text-sm font-medium text-slate-900">{data.jurisdiction}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Service Tier</p>
            <p className="text-sm font-medium text-slate-900">{data.serviceTier}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Progress</p>
            <p className="text-sm font-medium text-slate-900">{data.progressPercent}% complete</p>
          </div>
        </CardContent>
      </Card>

      <div className="h-2 w-full rounded bg-slate-200">
        <div className="h-full rounded bg-blue-600" style={{ width: `${data.progressPercent}%` }} />
      </div>

      <Link
        to={`/onboarding/${data.id}`}
        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Open onboarding workflow
      </Link>
    </div>
  );
}
