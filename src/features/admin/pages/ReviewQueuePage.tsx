import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { Button } from "../../../components/ui/button";
import { useReviewQueueQuery } from "../hooks/useAdminPortalQueries";
import { useUiStore } from "../../../store/ui.store";

const statusVariant = {
  pending: "warning",
  in_review: "info",
  resolved: "success",
} as const;

const priorityWeight = { low: 1, medium: 2, high: 3 } as const;

export default function ReviewQueuePage() {
  const { data = [], isLoading, isError } = useReviewQueueQuery();
  const search = useUiStore((state) => state.reviewQueueSearch);
  const statusFilter = useUiStore((state) => state.reviewQueueStatusFilter);
  const sortField = useUiStore((state) => state.reviewQueueSortField);
  const sortDirection = useUiStore((state) => state.reviewQueueSortDirection);
  const setSearch = useUiStore((state) => state.setReviewQueueSearch);
  const setStatusFilter = useUiStore((state) => state.setReviewQueueStatusFilter);
  const setSortField = useUiStore((state) => state.setReviewQueueSortField);
  const toggleSortDirection = useUiStore((state) => state.toggleReviewQueueSortDirection);

  const filteredRows = useMemo(() => {
    const filtered = data.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesQuery =
        query.length === 0 ||
        item.applicantName.toLowerCase().includes(query) ||
        item.documentName.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortField === "submittedAt") {
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      }
      if (sortField === "priority") {
        return priorityWeight[a.priority] - priorityWeight[b.priority];
      }
      return a.status.localeCompare(b.status);
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [data, search, sortDirection, sortField, statusFilter]);

  if (isLoading) return <LoadingState label="Loading review queue..." />;
  if (isError) return <ErrorState title="Unable to load review queue" onRetry={() => window.location.reload()} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Review Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-4">
          <Input
            placeholder="Search applicant or document"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="lg:col-span-2"
          />
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | "pending" | "in_review" | "resolved")}
            options={[
              { value: "all", label: "All statuses" },
              { value: "pending", label: "Pending" },
              { value: "in_review", label: "In Review" },
              { value: "resolved", label: "Resolved" },
            ]}
          />
          <div className="flex gap-2">
            <Select
              value={sortField}
              onChange={(event) => setSortField(event.target.value as "submittedAt" | "priority" | "status")}
              options={[
                { value: "submittedAt", label: "Sort by Submitted At" },
                { value: "priority", label: "Sort by Priority" },
                { value: "status", label: "Sort by Status" },
              ]}
            />
            <Button variant="outline" onClick={toggleSortDirection}>
              {sortDirection.toUpperCase()}
            </Button>
          </div>
        </div>

        {filteredRows.length === 0 ? (
          <EmptyState message="No records match the current filters." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.applicantName}</TableCell>
                  <TableCell>{row.documentName}</TableCell>
                  <TableCell>{new Date(row.submittedAt).toLocaleString()}</TableCell>
                  <TableCell>{row.priority.toUpperCase()}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[row.status]}>{row.status.replace("_", " ")}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
