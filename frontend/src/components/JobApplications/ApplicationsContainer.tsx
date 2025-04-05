import React, { useState, useMemo } from "react";
import { JobApplication } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { JobApplicationsTable } from "./JobApplicationsTable";
import {
  FiList,
  FiStar,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ApplicationsContainerProps {
  applications: JobApplication[];
  showOnlyStarred: boolean;
  onEdit: (application: JobApplication) => void;
  onDelete: (id: number) => void;
  onToggleStar: (id: number, starred: boolean) => void;
  onFilterChange: (value: boolean) => void;
}

// Define page size options
const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

export function ApplicationsContainer({
  applications,
  showOnlyStarred,
  onEdit,
  onDelete,
  onToggleStar,
  onFilterChange,
}: ApplicationsContainerProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Additional filters
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Get unique statuses from applications
  const availableStatuses = useMemo(() => {
    const statuses = new Set<string>();
    applications.forEach((app) => {
      if (app.status) statuses.add(app.status);
    });
    return Array.from(statuses).sort();
  }, [applications]);

  // Handle filter reset
  const handleResetFilters = () => {
    setStatusFilter(null);
    setDateFilter(null);
    onFilterChange(false);
  };

  // Filter applications based on all criteria
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Sort by date (newest first)
    result.sort((a, b) => {
      return (
        new Date(b.applied_on).getTime() - new Date(a.applied_on).getTime()
      );
    });

    // Star filter
    if (showOnlyStarred) {
      result = result.filter((app) => app.starred);
    }

    // Status filter
    if (statusFilter && statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      // Convert to YYYY-MM-DD for comparison
      const filterDate = dateFilter;
      result = result.filter((app) => {
        const appDate = app.applied_on.split("T")[0];
        return appDate === filterDate;
      });
    }

    return result;
  }, [applications, showOnlyStarred, statusFilter, dateFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / pageSize);
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredApplications.slice(startIndex, startIndex + pageSize);
  }, [filteredApplications, currentPage, pageSize]);

  // Handle page change
  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // When filters change, reset to first page
  React.useEffect(() => {
    setCurrentPage(1);
  }, [showOnlyStarred, statusFilter, dateFilter, pageSize]);

  return (
    <Card className="app-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center space-x-2">
            {showOnlyStarred ? (
              <FiStar className="h-5 w-5 text-amber-400 fill-amber-400" />
            ) : (
              <FiList className="h-5 w-5 text-primary" />
            )}
            <CardTitle>Job Applications</CardTitle>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Star filter */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterChange(!showOnlyStarred)}
              className={`h-9 gap-1.5 ${
                showOnlyStarred ? "bg-amber-50 border-amber-200" : ""
              }`}
            >
              <span>Starred</span>
              <FiStar
                className={`h-4 w-4 ${
                  showOnlyStarred
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted-foreground"
                }`}
              />
            </Button>

            {/* Advanced filters */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <FiFilter className="h-4 w-4" />
                  <span>Filters</span>
                  {(statusFilter || dateFilter) && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {(statusFilter ? 1 : 0) + (dateFilter ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[200px] p-3">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Filter by:</h4>

                  {/* Status filter */}
                  <div className="space-y-1">
                    <label className="text-xs flex items-center gap-1 text-muted-foreground">
                      <FiTag className="h-3 w-3" />
                      <span>Status</span>
                    </label>
                    <Select
                      value={statusFilter || "all"}
                      onValueChange={(value) =>
                        setStatusFilter(value === "all" ? null : value)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any status</SelectItem>
                        {availableStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date filter */}
                  <div className="space-y-1">
                    <label className="text-xs flex items-center gap-1 text-muted-foreground">
                      <FiCalendar className="h-3 w-3" />
                      <span>Applied on</span>
                    </label>
                    <Input
                      type="date"
                      value={dateFilter || ""}
                      onChange={(e) => setDateFilter(e.target.value || null)}
                      className="h-8 text-xs"
                    />
                  </div>

                  {/* Reset button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 mt-2 text-xs"
                    onClick={handleResetFilters}
                    disabled={!statusFilter && !dateFilter && !showOnlyStarred}
                  >
                    Reset all
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <CardDescription className="pt-1 flex items-center gap-1">
          <span className="font-medium text-primary">
            {filteredApplications.length}
          </span>
          {filteredApplications.length === 1
            ? "job application"
            : "job applications"}
          {(showOnlyStarred || statusFilter || dateFilter) &&
            " matching filters"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 pb-0">
        <JobApplicationsTable
          applications={paginatedApplications}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStar={onToggleStar}
          isStarredFilter={showOnlyStarred}
          totalApplications={applications.length}
        />
      </CardContent>

      {/* Pagination footer */}
      {filteredApplications.length > 0 && (
        <CardFooter className="flex items-center justify-between border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Rows per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {filteredApplications.length > 0
                ? `${(currentPage - 1) * pageSize + 1}-${Math.min(
                    currentPage * pageSize,
                    filteredApplications.length
                  )} of ${filteredApplications.length}`
                : "0 of 0"}
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FiChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <FiChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
