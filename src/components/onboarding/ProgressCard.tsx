import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { OnboardingProgress } from "../../types/onboarding";
import { StatusBadge } from "../common/StatusBadge";

interface ProgressCardProps {
  progress: OnboardingProgress;
}

export const ProgressCard = ({ progress }: ProgressCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg">Onboarding Progress</CardTitle>
      <StatusBadge status={progress.overallStatus} />
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{progress.progressPercent}% completed</span>
        <span>Current: {progress.currentStep.replace("_", " ")}</span>
      </div>
      <div className="h-2 w-full rounded bg-slate-200">
        <div className="h-full rounded bg-blue-600" style={{ width: `${progress.progressPercent}%` }} />
      </div>
    </CardContent>
  </Card>
);
