import { useQuery } from "@tanstack/react-query";
import { getClientDetail, getOnboardingProgress } from "../../../services/onboarding/onboarding.api";

export const useClientDetailQuery = (clientId: string) =>
  useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientDetail(clientId),
    enabled: Boolean(clientId),
  });

export const useOnboardingProgressQuery = (clientId: string) =>
  useQuery({
    queryKey: ["onboarding", clientId, "progress"],
    queryFn: () => getOnboardingProgress(clientId),
    enabled: Boolean(clientId),
  });
