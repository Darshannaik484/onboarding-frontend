import { useQuery } from "@tanstack/react-query";
import {
  getDashboardActivity,
  getDashboardClients,
  getDashboardSummary,
} from "../../../services/dashboard/dashboard.api";

export const useDashboardSummaryQuery = () =>
  useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

export const useDashboardClientsQuery = () =>
  useQuery({
    queryKey: ["dashboard", "clients"],
    queryFn: getDashboardClients,
  });

export const useDashboardActivityQuery = () =>
  useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: getDashboardActivity,
  });
