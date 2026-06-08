import { useQuery } from "@tanstack/react-query";
import {
  getApplicantDashboard,
  getDocumentStatuses,
  getFaceVerification,
  getKycStages,
  getOcrResults,
  getReuploadDocuments,
  getUploadTracking,
  getValidationResults,
} from "../../../services/applicant/applicantPortal.api";

export const useApplicantDashboardQuery = () =>
  useQuery({
    queryKey: ["applicant", "dashboard"],
    queryFn: getApplicantDashboard,
  });

export const useOcrResultsQuery = () =>
  useQuery({
    queryKey: ["applicant", "ocr-results"],
    queryFn: getOcrResults,
  });

export const useDocumentStatusesQuery = () =>
  useQuery({
    queryKey: ["applicant", "document-statuses"],
    queryFn: getDocumentStatuses,
  });

export const useValidationResultsQuery = () =>
  useQuery({
    queryKey: ["applicant", "validation-results"],
    queryFn: getValidationResults,
  });

export const useUploadTrackingQuery = () =>
  useQuery({
    queryKey: ["applicant", "upload-tracking"],
    queryFn: getUploadTracking,
  });

export const useReuploadDocumentsQuery = () =>
  useQuery({
    queryKey: ["applicant", "reupload-documents"],
    queryFn: getReuploadDocuments,
  });

export const useKycStagesQuery = () =>
  useQuery({
    queryKey: ["applicant", "kyc-stages"],
    queryFn: getKycStages,
  });

export const useFaceVerificationQuery = () =>
  useQuery({
    queryKey: ["applicant", "face-verification"],
    queryFn: getFaceVerification,
  });
