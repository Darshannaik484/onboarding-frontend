import api from "../../api/axios";
import type { ActivityItem, ClientSummary, DashboardSummary } from "../../types/dashboard";

export const getDashboardSummary = async () => {
  const response = await api.get<DashboardSummary>("/api/dashboard/summary");
  return response.data;
};

export const getDashboardClients = async () => {
  const response = await api.get<ClientSummary[]>("/api/dashboard/clients");
  return response.data;
};

export const getDashboardActivity = async () => {
  const response = await api.get<ActivityItem[]>("/api/dashboard/activity");
  return response.data;
};
