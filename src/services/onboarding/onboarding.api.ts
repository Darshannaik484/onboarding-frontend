import api from "../../api/axios";
import type { ClientDetail, OnboardingProgress } from "../../types/onboarding";

export const getClientDetail = async (clientId: string) => {
  const response = await api.get<ClientDetail>(`/api/clients/${clientId}`);
  return response.data;
};

export const getOnboardingProgress = async (clientId: string) => {
  const response = await api.get<OnboardingProgress>(`/api/onboarding/${clientId}/progress`);
  return response.data;
};
