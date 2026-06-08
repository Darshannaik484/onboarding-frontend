export type DocumentReviewStatus =
  | "uploaded"
  | "pending_review"
  | "approved"
  | "rejected"
  | "reupload_required";

export interface PortalMetricCard {
  id: string;
  label: string;
  value: string;
  trend?: string;
}

export interface PendingAction {
  id: string;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  description: string;
  occurredAt: string;
}

export interface ApplicantDashboardData {
  metrics: PortalMetricCard[];
  progressSummary: { stage: string; progressPercent: number }[];
  pendingActions: PendingAction[];
  recentActivity: ActivityFeedItem[];
}

export interface OcrFieldResult {
  id: string;
  fieldName: string;
  extractedValue: string;
  confidenceScore: number;
  validationIssue?: string;
}

export interface DocumentStatusItem {
  id: string;
  documentName: string;
  status: DocumentReviewStatus;
  updatedAt: string;
  reviewerComment?: string;
}

export interface ValidationResultItem {
  id: string;
  fieldName: string;
  status: "valid" | "invalid";
  errorDetails?: string;
  suggestedCorrection?: string;
}

export interface UploadTrackingItem {
  id: string;
  fileName: string;
  progressPercent: number;
  state: "in_progress" | "success" | "failed";
}

export interface ReuploadVersion {
  version: number;
  uploadedAt: string;
  status: "rejected" | "reuploaded" | "approved";
  note: string;
}

export interface ReuploadDocument {
  id: string;
  documentName: string;
  status: DocumentReviewStatus;
  versions: ReuploadVersion[];
  notification: string;
}

export interface KycStage {
  id: string;
  stageName: string;
  status: "completed" | "in_progress" | "pending" | "blocked";
  completedAt?: string;
}

export interface FaceVerificationState {
  status: "not_started" | "capturing" | "processing" | "verified" | "failed";
  confidenceScore: number;
  message: string;
}

export interface HumanReviewDashboardData {
  metrics: PortalMetricCard[];
  reviewerActivity: ActivityFeedItem[];
}

export interface ReviewQueueItem {
  id: string;
  applicantName: string;
  documentName: string;
  submittedAt: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_review" | "resolved";
}

export interface CorrectionField {
  id: string;
  fieldName: string;
  currentValue: string;
  correctedValue: string;
  validationMessage?: string;
}

export interface ReconciliationItem {
  id: string;
  sourceSystem: string;
  fieldName: string;
  mismatchDetail: string;
  resolutionStatus: "open" | "in_progress" | "resolved";
}

export interface CrmSyncItem {
  id: string;
  entityName: string;
  syncStatus: "synced" | "failed" | "retrying";
  lastAttemptAt: string;
  failureReason?: string;
}

export interface SlaMetric {
  id: string;
  metricName: string;
  target: string;
  current: string;
  status: "healthy" | "warning" | "breach";
}

export interface EscalationCase {
  id: string;
  caseRef: string;
  priority: "P1" | "P2" | "P3";
  issue: string;
  resolutionStatus: "open" | "assigned" | "resolved";
}

export interface AnalyticsKpi {
  id: string;
  label: string;
  value: string;
}

export interface AnalyticsSeries {
  id: string;
  label: string;
  value: number;
}

export interface AnalyticsData {
  kpis: AnalyticsKpi[];
  onboardingByStage: AnalyticsSeries[];
  approvalRates: AnalyticsSeries[];
  documentProcessingTimes: AnalyticsSeries[];
}
