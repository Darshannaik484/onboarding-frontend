export type OnboardingStatus = "pending" | "in_progress" | "blocked" | "completed";

export interface DashboardSummary {
  totalClients: number;
  completedOnboarding: number;
  inProgressOnboarding: number;
  blockedOnboarding: number;
}

export interface ClientSummary {
  id: string;
  name: string;
  jurisdiction: string;
  serviceTier: string;
  status: OnboardingStatus;
  progressPercent: number;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: "upload" | "status_change" | "ai_suggestion" | "note";
}
