import type { OnboardingStatus } from "../../types/dashboard";
import { cn } from "../../lib/utils";
import { useTranslation } from "react-i18next";

interface StatusBadgeProps {
  status: OnboardingStatus;
}

const statusMap: Record<OnboardingStatus, { classes: string }> = {
  pending: { classes: "bg-slate-100 text-slate-700" },
  in_progress: { classes: "bg-blue-100 text-blue-700" },
  blocked: { classes: "bg-amber-100 text-amber-700" },
  completed: { classes: "bg-emerald-100 text-emerald-700" },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        statusMap[status].classes,
      )}
    >
      {t(`status.${status}`)}
    </span>
  );
};
