import { useQuery } from "@tanstack/react-query";
import {
  getAnalyticsData,
  getCorrectionFields,
  getCrmSyncItems,
  getEscalationCases,
  getHumanReviewDashboard,
  getReconciliationItems,
  getReviewQueue,
  getSlaMetrics,
} from "../../../services/admin/adminPortal.api";

export const useHumanReviewDashboardQuery = () =>
  useQuery({
    queryKey: ["admin", "human-review-dashboard"],
    queryFn: getHumanReviewDashboard,
  });

export const useReviewQueueQuery = () =>
  useQuery({
    queryKey: ["admin", "review-queue"],
    queryFn: getReviewQueue,
  });

export const useCorrectionFieldsQuery = () =>
  useQuery({
    queryKey: ["admin", "field-corrections"],
    queryFn: getCorrectionFields,
  });

export const useReconciliationItemsQuery = () =>
  useQuery({
    queryKey: ["admin", "reconciliation"],
    queryFn: getReconciliationItems,
  });

export const useCrmSyncItemsQuery = () =>
  useQuery({
    queryKey: ["admin", "crm-sync"],
    queryFn: getCrmSyncItems,
  });

export const useSlaMetricsQuery = () =>
  useQuery({
    queryKey: ["admin", "sla-metrics"],
    queryFn: getSlaMetrics,
  });

export const useEscalationCasesQuery = () =>
  useQuery({
    queryKey: ["admin", "escalation-cases"],
    queryFn: getEscalationCases,
  });

export const useAnalyticsDataQuery = () =>
  useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: getAnalyticsData,
  });
