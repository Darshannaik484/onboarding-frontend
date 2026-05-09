import type { OnboardingStatus } from "./dashboard";

export type WorkflowStepKey =
  | "identity"
  | "company_documents"
  | "financial_documents"
  | "compliance"
  | "review";

export interface WorkflowStep {
  key: WorkflowStepKey;
  label: string;
  description: string;
  status: "pending" | "current" | "completed" | "blocked";
}

export interface OnboardingProgress {
  clientId: string;
  progressPercent: number;
  currentStep: WorkflowStepKey;
  overallStatus: OnboardingStatus;
  steps: WorkflowStep[];
}

export interface ClientDetail {
  id: string;
  name: string;
  contactEmail: string;
  jurisdiction: string;
  serviceTier: string;
  status: OnboardingStatus;
  progressPercent: number;
}
