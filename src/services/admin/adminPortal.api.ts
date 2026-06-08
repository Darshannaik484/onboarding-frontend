import type {
  AnalyticsData,
  CorrectionField,
  CrmSyncItem,
  EscalationCase,
  HumanReviewDashboardData,
  ReconciliationItem,
  ReviewQueueItem,
  SlaMetric,
} from "../../types/portal";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getHumanReviewDashboard = async (): Promise<HumanReviewDashboardData> => {
  await wait(150);
  return {
    metrics: [
      { id: "hr1", label: "Pending Reviews", value: "42", trend: "8 overdue" },
      { id: "hr2", label: "Avg Review Time", value: "18m", trend: "-2m vs yesterday" },
      { id: "hr3", label: "Resolved Today", value: "31", trend: "+12%" },
      { id: "hr4", label: "Escalated", value: "6", trend: "2 critical" },
    ],
    reviewerActivity: [
      {
        id: "ha1",
        title: "Anika resolved case #RV-903",
        description: "Corrected mismatch in tax ID field.",
        occurredAt: "2026-06-08T10:12:00.000Z",
      },
      {
        id: "ha2",
        title: "Rohan escalated case #RV-917",
        description: "Potential forged statement flagged.",
        occurredAt: "2026-06-08T11:04:00.000Z",
      },
    ],
  };
};

export const getReviewQueue = async (): Promise<ReviewQueueItem[]> => {
  await wait(170);
  return [
    {
      id: "q1",
      applicantName: "Aarav Sharma",
      documentName: "Address Proof",
      submittedAt: "2026-06-08T08:25:00.000Z",
      priority: "high",
      status: "pending",
    },
    {
      id: "q2",
      applicantName: "Meera Nair",
      documentName: "Bank Statement",
      submittedAt: "2026-06-08T07:18:00.000Z",
      priority: "medium",
      status: "in_review",
    },
    {
      id: "q3",
      applicantName: "Rahul Mehta",
      documentName: "Passport",
      submittedAt: "2026-06-07T16:05:00.000Z",
      priority: "low",
      status: "resolved",
    },
  ];
};

export const getCorrectionFields = async (): Promise<CorrectionField[]> => {
  await wait(120);
  return [
    {
      id: "c1",
      fieldName: "Legal Name",
      currentValue: "Aarav Sharm",
      correctedValue: "Aarav Sharma",
      validationMessage: "Name must match government-issued ID",
    },
    {
      id: "c2",
      fieldName: "Tax Identifier",
      currentValue: "TIN-12X3",
      correctedValue: "TIN-123X",
      validationMessage: "Alphanumeric order mismatch",
    },
  ];
};

export const getReconciliationItems = async (): Promise<ReconciliationItem[]> => {
  await wait(140);
  return [
    {
      id: "rec1",
      sourceSystem: "Core KYC",
      fieldName: "Registered Address",
      mismatchDetail: "Street number differs between CRM and document OCR",
      resolutionStatus: "in_progress",
    },
    {
      id: "rec2",
      sourceSystem: "Document Vault",
      fieldName: "Tax ID",
      mismatchDetail: "Tax ID checksum failed in OCR output",
      resolutionStatus: "open",
    },
  ];
};

export const getCrmSyncItems = async (): Promise<CrmSyncItem[]> => {
  await wait(130);
  return [
    {
      id: "crm1",
      entityName: "Applicant #A-1022",
      syncStatus: "synced",
      lastAttemptAt: "2026-06-08T10:10:00.000Z",
    },
    {
      id: "crm2",
      entityName: "Applicant #A-1027",
      syncStatus: "failed",
      lastAttemptAt: "2026-06-08T10:31:00.000Z",
      failureReason: "CRM timeout during contact update",
    },
  ];
};

export const getSlaMetrics = async (): Promise<SlaMetric[]> => {
  await wait(130);
  return [
    { id: "sla1", metricName: "Initial Review", target: "< 2h", current: "1h 37m", status: "healthy" },
    { id: "sla2", metricName: "Escalation Response", target: "< 1h", current: "1h 12m", status: "warning" },
    { id: "sla3", metricName: "Final Approval", target: "< 24h", current: "29h", status: "breach" },
  ];
};

export const getEscalationCases = async (): Promise<EscalationCase[]> => {
  await wait(120);
  return [
    {
      id: "e1",
      caseRef: "ESC-2201",
      priority: "P1",
      issue: "Potential identity mismatch",
      resolutionStatus: "assigned",
    },
    {
      id: "e2",
      caseRef: "ESC-2202",
      priority: "P2",
      issue: "Repeated upload failures",
      resolutionStatus: "open",
    },
  ];
};

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  await wait(180);
  return {
    kpis: [
      { id: "ak1", label: "Onboarding Completion", value: "74%" },
      { id: "ak2", label: "Approval Rate", value: "68%" },
      { id: "ak3", label: "Avg Processing Time", value: "21m" },
      { id: "ak4", label: "OCR Accuracy", value: "92%" },
    ],
    onboardingByStage: [
      { id: "s1", label: "Identity", value: 92 },
      { id: "s2", label: "Documents", value: 78 },
      { id: "s3", label: "Validation", value: 63 },
      { id: "s4", label: "Approval", value: 51 },
    ],
    approvalRates: [
      { id: "a1", label: "Approved", value: 68 },
      { id: "a2", label: "Rejected", value: 18 },
      { id: "a3", label: "Pending", value: 14 },
    ],
    documentProcessingTimes: [
      { id: "d1", label: "Passport", value: 14 },
      { id: "d2", label: "Address Proof", value: 19 },
      { id: "d3", label: "Bank Statement", value: 24 },
    ],
  };
};
