import api from "../../api/axios";
import { shouldUseMockApi } from "../apiMode";
import type {
  ApplicantDashboardData,
  DocumentStatusItem,
  FaceVerificationState,
  KycStage,
  OcrFieldResult,
  ReuploadDocument,
  UploadTrackingItem,
  ValidationResultItem,
} from "../../types/portal";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getApplicantDashboardMock = async (): Promise<ApplicantDashboardData> => {
  await wait(180);
  return {
    metrics: [
      { id: "m1", label: "Applications", value: "24", trend: "+4 this week" },
      { id: "m2", label: "Completed KYC", value: "17", trend: "71% completion" },
      { id: "m3", label: "Pending Reviews", value: "5", trend: "2 urgent" },
      { id: "m4", label: "Re-uploads", value: "3", trend: "1 today" },
    ],
    progressSummary: [
      { stage: "Identity", progressPercent: 100 },
      { stage: "Documents", progressPercent: 80 },
      { stage: "Validation", progressPercent: 65 },
      { stage: "Approval", progressPercent: 40 },
    ],
    pendingActions: [
      { id: "a1", title: "Re-upload address proof", dueDate: "2026-06-10", priority: "high" },
      { id: "a2", title: "Confirm tax declaration", dueDate: "2026-06-11", priority: "medium" },
      { id: "a3", title: "Complete face verification", dueDate: "2026-06-12", priority: "high" },
    ],
    recentActivity: [
      {
        id: "r1",
        title: "Passport verified",
        description: "OCR and validation completed with high confidence.",
        occurredAt: "2026-06-08T09:12:00.000Z",
      },
      {
        id: "r2",
        title: "Compliance check started",
        description: "Automated AML screening is in progress.",
        occurredAt: "2026-06-08T10:21:00.000Z",
      },
    ],
  };
};

const getOcrResultsMock = async (): Promise<OcrFieldResult[]> => {
  await wait(140);
  return [
    { id: "f1", fieldName: "Full Name", extractedValue: "Aarav Sharma", confidenceScore: 98 },
    {
      id: "f2",
      fieldName: "Document Number",
      extractedValue: "A12345ZX",
      confidenceScore: 89,
      validationIssue: "Checksum mismatch",
    },
    {
      id: "f3",
      fieldName: "Expiry Date",
      extractedValue: "2026-01-02",
      confidenceScore: 76,
      validationIssue: "Date appears partially blurred",
    },
  ];
};

const getDocumentStatusesMock = async (): Promise<DocumentStatusItem[]> => {
  await wait(140);
  return [
    { id: "d1", documentName: "Passport", status: "approved", updatedAt: "2026-06-07T12:20:00.000Z" },
    {
      id: "d2",
      documentName: "Address Proof",
      status: "reupload_required",
      updatedAt: "2026-06-08T08:15:00.000Z",
      reviewerComment: "Image corners are clipped",
    },
    {
      id: "d3",
      documentName: "Bank Statement",
      status: "pending_review",
      updatedAt: "2026-06-08T11:30:00.000Z",
    },
  ];
};

const getValidationResultsMock = async (): Promise<ValidationResultItem[]> => {
  await wait(160);
  return [
    { id: "v1", fieldName: "Date of Birth", status: "valid" },
    {
      id: "v2",
      fieldName: "Registered Address",
      status: "invalid",
      errorDetails: "Address does not match utility bill",
      suggestedCorrection: "Update address to match latest utility bill copy",
    },
    {
      id: "v3",
      fieldName: "Tax ID",
      status: "invalid",
      errorDetails: "Unexpected character at position 7",
      suggestedCorrection: "Re-enter Tax ID and upload supporting certificate",
    },
  ];
};

const getUploadTrackingMock = async (): Promise<UploadTrackingItem[]> => {
  await wait(120);
  return [
    { id: "u1", fileName: "passport.pdf", progressPercent: 100, state: "success" },
    { id: "u2", fileName: "address_proof.jpg", progressPercent: 67, state: "in_progress" },
    { id: "u3", fileName: "tax_form.pdf", progressPercent: 100, state: "failed" },
  ];
};

const getReuploadDocumentsMock = async (): Promise<ReuploadDocument[]> => {
  await wait(160);
  return [
    {
      id: "re1",
      documentName: "Address Proof",
      status: "reupload_required",
      notification: "Please replace with uncropped utility bill before 10 Jun.",
      versions: [
        { version: 1, uploadedAt: "2026-06-03T11:00:00.000Z", status: "rejected", note: "Low clarity" },
        { version: 2, uploadedAt: "2026-06-06T16:20:00.000Z", status: "rejected", note: "Cropped edges" },
      ],
    },
  ];
};

const getKycStagesMock = async (): Promise<KycStage[]> => {
  await wait(120);
  return [
    { id: "k1", stageName: "Identity Verification", status: "completed", completedAt: "2026-06-05" },
    { id: "k2", stageName: "Document Review", status: "in_progress" },
    { id: "k3", stageName: "Risk Assessment", status: "pending" },
    { id: "k4", stageName: "Final Approval", status: "pending" },
  ];
};

const getFaceVerificationMock = async (): Promise<FaceVerificationState> => {
  await wait(100);
  return {
    status: "not_started",
    confidenceScore: 0,
    message: "Ready to capture a live selfie for verification.",
  };
};

const withFallback = async <T>(request: () => Promise<T>, fallback: () => Promise<T>) => {
  try {
    return await request();
  } catch (error) {
    if (shouldUseMockApi(error)) return fallback();
    throw error;
  }
};

export const getApplicantDashboard = async (): Promise<ApplicantDashboardData> =>
  withFallback(
    async () => {
      const response = await api.get<ApplicantDashboardData>("/api/portal/applicant/dashboard");
      return response.data;
    },
    getApplicantDashboardMock,
  );

export const getOcrResults = async (): Promise<OcrFieldResult[]> =>
  withFallback(
    async () => {
      const response = await api.get<OcrFieldResult[]>("/api/portal/applicant/ocr-results");
      return response.data;
    },
    getOcrResultsMock,
  );

export const getDocumentStatuses = async (): Promise<DocumentStatusItem[]> =>
  withFallback(
    async () => {
      const response = await api.get<DocumentStatusItem[]>("/api/portal/applicant/document-status");
      return response.data;
    },
    getDocumentStatusesMock,
  );

export const getValidationResults = async (): Promise<ValidationResultItem[]> =>
  withFallback(
    async () => {
      const response = await api.get<ValidationResultItem[]>("/api/portal/applicant/validation-results");
      return response.data;
    },
    getValidationResultsMock,
  );

export const getUploadTracking = async (): Promise<UploadTrackingItem[]> =>
  withFallback(
    async () => {
      const response = await api.get<UploadTrackingItem[]>("/api/portal/applicant/upload-tracking");
      return response.data;
    },
    getUploadTrackingMock,
  );

export const getReuploadDocuments = async (): Promise<ReuploadDocument[]> =>
  withFallback(
    async () => {
      const response = await api.get<ReuploadDocument[]>("/api/portal/applicant/reupload");
      return response.data;
    },
    getReuploadDocumentsMock,
  );

export const getKycStages = async (): Promise<KycStage[]> =>
  withFallback(
    async () => {
      const response = await api.get<KycStage[]>("/api/portal/applicant/kyc-status");
      return response.data;
    },
    getKycStagesMock,
  );

export const getFaceVerification = async (): Promise<FaceVerificationState> =>
  withFallback(
    async () => {
      const response = await api.get<FaceVerificationState>("/api/portal/applicant/face-verification");
      return response.data;
    },
    getFaceVerificationMock,
  );
