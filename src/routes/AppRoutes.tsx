import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ClientDetailPage from "../features/clients/pages/ClientDetailPage";
import OnboardingOverviewPage from "../features/onboarding/pages/OnboardingOverviewPage";
import OnboardingStepPage from "../features/onboarding/pages/OnboardingStepPage";
import ApplicantDashboardPage from "../features/applicant/pages/ApplicantDashboardPage";
import OcrResultPage from "../features/applicant/pages/OcrResultPage";
import DocumentStatusPage from "../features/applicant/pages/DocumentStatusPage";
import ValidationResultPage from "../features/applicant/pages/ValidationResultPage";
import UploadTrackingPage from "../features/applicant/pages/UploadTrackingPage";
import ReuploadDocumentPage from "../features/applicant/pages/ReuploadDocumentPage";
import EnhancedChatbotPage from "../features/applicant/pages/EnhancedChatbotPage";
import KycStatusPage from "../features/applicant/pages/KycStatusPage";
import FaceVerificationPage from "../features/applicant/pages/FaceVerificationPage";
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import ReviewQueuePage from "../features/admin/pages/ReviewQueuePage";
import DocumentViewerPage from "../features/admin/pages/DocumentViewerPage";
import FieldCorrectionPage from "../features/admin/pages/FieldCorrectionPage";
import ReconciliationDashboardPage from "../features/admin/pages/ReconciliationDashboardPage";
import CrmSyncStatusPage from "../features/admin/pages/CrmSyncStatusPage";
import SlaMonitoringPage from "../features/admin/pages/SlaMonitoringPage";
import EscalationDashboardPage from "../features/admin/pages/EscalationDashboardPage";
import AnalyticsDashboardPage from "../features/admin/pages/AnalyticsDashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailPage />} />
          <Route path="/onboarding/:clientId" element={<OnboardingOverviewPage />} />
          <Route path="/onboarding/:clientId/step/:stepKey" element={<OnboardingStepPage />} />
          <Route path="/portal/applicant/dashboard" element={<ApplicantDashboardPage />} />
          <Route path="/portal/applicant/ocr-results" element={<OcrResultPage />} />
          <Route path="/portal/applicant/document-status" element={<DocumentStatusPage />} />
          <Route path="/portal/applicant/validation-results" element={<ValidationResultPage />} />
          <Route path="/portal/applicant/upload-tracking" element={<UploadTrackingPage />} />
          <Route path="/portal/applicant/reupload" element={<ReuploadDocumentPage />} />
          <Route path="/portal/applicant/chatbot" element={<EnhancedChatbotPage />} />
          <Route path="/portal/applicant/kyc-status" element={<KycStatusPage />} />
          <Route path="/portal/applicant/face-verification" element={<FaceVerificationPage />} />
          <Route path="/portal/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/portal/admin/review-queue" element={<ReviewQueuePage />} />
          <Route path="/portal/admin/document-viewer" element={<DocumentViewerPage />} />
          <Route path="/portal/admin/field-corrections" element={<FieldCorrectionPage />} />
          <Route path="/portal/admin/reconciliation" element={<ReconciliationDashboardPage />} />
          <Route path="/portal/admin/crm-sync" element={<CrmSyncStatusPage />} />
          <Route path="/portal/admin/sla-monitoring" element={<SlaMonitoringPage />} />
          <Route path="/portal/admin/escalations" element={<EscalationDashboardPage />} />
          <Route path="/portal/admin/analytics" element={<AnalyticsDashboardPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
