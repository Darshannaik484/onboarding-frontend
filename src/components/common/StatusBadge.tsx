import type { OnboardingStatus } from "../../types/dashboard";
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  status: OnboardingStatus;
}

const statusMap: Record<OnboardingStatus, { label: string; classes: string }> = {
  pending: { label: "Pending", classes: "bg-slate-100 text-slate-700" },
  in_progress: { label: "In Progress", classes: "bg-blue-100 text-blue-700" },
  blocked: { label: "Blocked", classes: "bg-amber-100 text-amber-700" },
  completed: { label: "Completed", classes: "bg-emerald-100 text-emerald-700" },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
      statusMap[status].classes,
    )}
  >
    {statusMap[status].label}
  </span>
);
