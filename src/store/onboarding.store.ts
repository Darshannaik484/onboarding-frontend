import { create } from "zustand";
import type { WorkflowStepKey } from "../types/onboarding";

interface OnboardingStoreState {
  selectedClientId: string | null;
  activeStep: WorkflowStepKey | null;
  setSelectedClient: (clientId: string | null) => void;
  setActiveStep: (step: WorkflowStepKey | null) => void;
}

export const useOnboardingStore = create<OnboardingStoreState>((set) => ({
  selectedClientId: null,
  activeStep: null,
  setSelectedClient: (clientId) => set({ selectedClientId: clientId }),
  setActiveStep: (step) => set({ activeStep: step }),
}));
