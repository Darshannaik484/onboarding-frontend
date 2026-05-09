import api from "../../api/axios";
import type { ActivityItem, ClientSummary, DashboardSummary } from "../../types/dashboard";
import { shouldUseMockApi } from "../apiMode";
import {
  mockGetDashboardActivity,
  mockGetDashboardClients,
  mockGetDashboardSummary,
} from "../mock/mockApi";

export const getDashboardSummary = async () => {
  try {
    const response = await api.get<DashboardSummary>("/api/dashboard/summary");
    return response.data;
  } catch (error) {
    if (shouldUseMockApi(error)) return mockGetDashboardSummary();
    throw error;
  }
};

export const getDashboardClients = async () => {
  try {
    const response = await api.get<ClientSummary[]>("/api/dashboard/clients");
    return response.data;
  } catch (error) {
    if (shouldUseMockApi(error)) return mockGetDashboardClients();
    throw error;
  }
};

export const getDashboardActivity = async () => {
  try {
    const response = await api.get<ActivityItem[]>("/api/dashboard/activity");
    return response.data;
  } catch (error) {
    if (shouldUseMockApi(error)) return mockGetDashboardActivity();
    throw error;
  }
};
