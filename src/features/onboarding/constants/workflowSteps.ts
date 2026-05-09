import type { WorkflowStepKey } from "../../../types/onboarding";

interface StepContent {
  title: string;
  description: string;
  checklist: string[];
}

export const workflowStepOrder: WorkflowStepKey[] = [
  "identity",
  "company_documents",
  "financial_documents",
  "compliance",
  "review",
];

export const workflowStepContent: Record<WorkflowStepKey, StepContent> = {
  identity: {
    title: "Identity Verification",
    description: "Collect and validate personal identity documents for key stakeholders.",
    checklist: ["Passport", "Government issued ID", "Proof of address"],
  },
  company_documents: {
    title: "Company Documents",
    description: "Upload legal and registration paperwork for the organization.",
    checklist: ["Certificate of incorporation", "Company registration proof", "Tax registration"],
  },
  financial_documents: {
    title: "Financial Documents",
    description: "Provide financial statements and banking documentation.",
    checklist: ["Bank statements", "Audited reports", "Tax filings"],
  },
  compliance: {
    title: "Compliance Checks",
    description: "Submit compliance declarations and legal attestations.",
    checklist: ["AML declaration", "KYC forms", "Regulatory approvals"],
  },
  review: {
    title: "Final Review",
    description: "Review submissions and resolve outstanding validation items.",
    checklist: ["Review rejected files", "Address blocker comments", "Submit for approval"],
  },
};
