import { Link } from "react-router-dom";
import type { ClientSummary } from "../../types/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { StatusBadge } from "../common/StatusBadge";
import { useTranslation } from "react-i18next";

interface ClientSummaryCardProps {
  client: ClientSummary;
}

export const ClientSummaryCard = ({ client }: ClientSummaryCardProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{client.name}</CardTitle>
        <CardDescription>
          {client.jurisdiction} · {client.serviceTier}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <StatusBadge status={client.status} />
          <p className="text-sm text-slate-500">{t("client.progressComplete", { value: client.progressPercent })}</p>
        </div>
        <div className="h-2 w-full rounded bg-slate-200">
          <div className="h-full rounded bg-blue-600" style={{ width: `${client.progressPercent}%` }} />
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/clients/${client.id}`}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {t("dashboard.viewClient")}
          </Link>
          <Link
            to={`/onboarding/${client.id}`}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {t("dashboard.continue")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
