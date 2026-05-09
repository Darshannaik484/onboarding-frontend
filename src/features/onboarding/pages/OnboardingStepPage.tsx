import { Link, Navigate, useParams } from "react-router-dom";
import { OnboardingStepContent } from "../../../components/onboarding/OnboardingStepContent";
import { ProgressCard } from "../../../components/onboarding/ProgressCard";
import { WorkflowStepper } from "../../../components/onboarding/WorkflowStepper";
import { useOnboardingProgressQuery } from "../hooks/useOnboardingQueries";
import {
  workflowStepContent,
  workflowStepOrder,
} from "../constants/workflowSteps";
import type { WorkflowStepKey } from "../../../types/onboarding";
import { useOnboardingStore } from "../../../store/onboarding.store";
import { useEffect } from "react";

const isWorkflowStepKey = (value: string): value is WorkflowStepKey =>
  workflowStepOrder.includes(value as WorkflowStepKey);

export default function OnboardingStepPage() {
  const { clientId = "", stepKey = "" } = useParams();
  const setSelectedClient = useOnboardingStore((state) => state.setSelectedClient);
  const setActiveStep = useOnboardingStore((state) => state.setActiveStep);
  const { data, isLoading, isError } = useOnboardingProgressQuery(clientId);

  useEffect(() => {
    setSelectedClient(clientId || null);
  }, [clientId, setSelectedClient]);

  useEffect(() => {
    if (isWorkflowStepKey(stepKey)) {
      setActiveStep(stepKey);
    } else {
      setActiveStep(null);
    }
  }, [setActiveStep, stepKey]);

  if (!isWorkflowStepKey(stepKey)) {
    return <Navigate to={`/onboarding/${clientId}`} replace />;
  }

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading workflow step...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Unable to load workflow details.</p>;
  }

  const stepIndex = workflowStepOrder.indexOf(stepKey);
  const previousStep = stepIndex > 0 ? workflowStepOrder[stepIndex - 1] : null;
  const nextStep = stepIndex < workflowStepOrder.length - 1 ? workflowStepOrder[stepIndex + 1] : null;
  const content = workflowStepContent[stepKey];

  return (
    <div className="space-y-6">
      <ProgressCard progress={data} />
      <WorkflowStepper steps={data.steps} />
      <OnboardingStepContent
        title={content.title}
        description={content.description}
        checklist={content.checklist}
      />
      <div className="flex flex-wrap gap-3">
        {previousStep ? (
          <Link
            to={`/onboarding/${clientId}/step/${previousStep}`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Previous step
          </Link>
        ) : null}
        {nextStep ? (
          <Link
            to={`/onboarding/${clientId}/step/${nextStep}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Next step
          </Link>
        ) : (
          <Link
            to={`/onboarding/${clientId}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Complete review
          </Link>
        )}
      </div>
    </div>
  );
}
