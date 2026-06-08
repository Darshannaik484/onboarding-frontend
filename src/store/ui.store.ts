import { create } from "zustand";

type QueueSortField = "submittedAt" | "priority" | "status";
type QueueSortDirection = "asc" | "desc";

interface UiStoreState {
  reviewQueueSearch: string;
  reviewQueueStatusFilter: "all" | "pending" | "in_review" | "resolved";
  reviewQueueSortField: QueueSortField;
  reviewQueueSortDirection: QueueSortDirection;
  documentViewerZoom: number;
  setReviewQueueSearch: (value: string) => void;
  setReviewQueueStatusFilter: (value: "all" | "pending" | "in_review" | "resolved") => void;
  setReviewQueueSortField: (value: QueueSortField) => void;
  toggleReviewQueueSortDirection: () => void;
  setDocumentViewerZoom: (value: number) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  reviewQueueSearch: "",
  reviewQueueStatusFilter: "all",
  reviewQueueSortField: "submittedAt",
  reviewQueueSortDirection: "desc",
  documentViewerZoom: 100,
  setReviewQueueSearch: (value) => set({ reviewQueueSearch: value }),
  setReviewQueueStatusFilter: (value) => set({ reviewQueueStatusFilter: value }),
  setReviewQueueSortField: (value) => set({ reviewQueueSortField: value }),
  toggleReviewQueueSortDirection: () =>
    set((state) => ({
      reviewQueueSortDirection: state.reviewQueueSortDirection === "asc" ? "desc" : "asc",
    })),
  setDocumentViewerZoom: (value) => set({ documentViewerZoom: value }),
}));
