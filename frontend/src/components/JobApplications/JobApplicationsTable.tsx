import React from "react";
import { JobApplication } from "@/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  FiEdit2,
  FiTrash2,
  FiStar,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiFilter,
} from "react-icons/fi";

interface JobApplicationsTableProps {
  applications: JobApplication[];
  onEdit: (application: JobApplication) => void;
  onDelete: (id: number) => void;
  onToggleStar: (id: number, starred: boolean) => void;
  isStarredFilter?: boolean;
  totalApplications?: number;
}

// Function to get status badge color based on status
function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "applied":
      return "bg-blue-100 text-blue-800";
    case "phone screening":
      return "bg-purple-100 text-purple-800";
    case "interview":
      return "bg-indigo-100 text-indigo-800";
    case "technical assessment":
      return "bg-sky-100 text-sky-800";
    case "offer":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "withdrawn":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function JobApplicationsTable({
  applications,
  onEdit,
  onDelete,
  onToggleStar,
  isStarredFilter = false,
  totalApplications = 0,
}: JobApplicationsTableProps) {
  const hasApplications = totalApplications > 0;

  // Check if we're showing a 'no results' message because of filters
  const showFilterNoResultsMessage =
    applications.length === 0 && hasApplications;

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="font-semibold pl-4">Company</TableHead>
            <TableHead className="font-semibold px-4">Position</TableHead>
            <TableHead className="font-semibold px-4">Status</TableHead>
            <TableHead className="font-semibold px-4">Applied On</TableHead>
            <TableHead className="font-semibold px-4">Starred</TableHead>
            <TableHead className="text-right font-semibold pr-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-12 text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  {showFilterNoResultsMessage ? (
                    isStarredFilter ? (
                      // No starred applications
                      <>
                        <FiStar className="h-12 w-12 opacity-30" />
                        <p>No starred job applications</p>
                        <p className="text-sm">
                          Star some applications to see them here.
                        </p>
                      </>
                    ) : (
                      // No applications matching other filters
                      <>
                        <FiFilter className="h-12 w-12 opacity-30" />
                        <p>No matching job applications</p>
                        <p className="text-sm">
                          Try changing or resetting your filters.
                        </p>
                      </>
                    )
                  ) : (
                    // No applications at all
                    <>
                      <FiBriefcase className="h-12 w-12 opacity-30" />
                      <p>No job applications yet</p>
                      <p className="text-sm">
                        Add your first job application to start tracking.
                      </p>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application.id} className="table-row-hover">
                <TableCell className="font-medium pl-4">
                  <div className="flex items-center space-x-2">
                    <FiBriefcase className="h-4 w-4 text-primary/70" />
                    <span>{application.company_name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center space-x-2">
                    <FiUser className="h-4 w-4 text-secondary/70" />
                    <span>{application.position_title}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <span
                    className={`status-badge ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(application.applied_on).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <button
                    onClick={() =>
                      onToggleStar(application.id, !application.starred)
                    }
                    className="focus:outline-none transition-transform duration-200 hover:scale-110 text-amber-400 hover:text-amber-500"
                    aria-label={
                      application.starred
                        ? "Unstar this application"
                        : "Star this application"
                    }
                  >
                    <FiStar
                      className={`h-5 w-5 ${
                        application.starred ? "fill-amber-400" : "fill-none"
                      }`}
                    />
                  </button>
                </TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(application)}
                      className="h-8 w-8 text-primary/80 hover:text-primary hover:bg-primary/5"
                      aria-label="Edit application"
                    >
                      <FiEdit2 className="h-4 w-4 action-icon" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(application.id)}
                      className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/5"
                      aria-label="Delete application"
                    >
                      <FiTrash2 className="h-4 w-4 action-icon" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
