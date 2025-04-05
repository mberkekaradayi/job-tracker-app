"use client";

import React, { useState, useEffect } from "react";
import { JobApplication, JobApplicationFormData } from "@/types";
import {
  getJobApplications,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
  toggleStarred,
} from "@/lib/api";
import {
  Navbar,
  ApplicationsContainer,
  ApplicationFormModal,
  ConfirmDeleteDialog,
} from "@/components/JobApplications";
import { toast } from "sonner";
import { Footer } from "@/components/JobApplications/Footer";

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<
    JobApplication | undefined
  >(undefined);

  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<number | null>(
    null
  );

  // Fetch job applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetch job applications from API
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await getJobApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      toast.error("Failed to load job applications");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle creating a new job application
  const handleCreateApplication = async (data: JobApplicationFormData) => {
    setIsLoading(true);
    try {
      const newApplication = await createJobApplication(data);
      toast.success("Job application created successfully");

      // Add the new application to the top of the list
      setApplications([newApplication, ...applications]);

      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating job application:", error);
      toast.error("Failed to create job application");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating an existing job application
  const handleUpdateApplication = async (data: JobApplicationFormData) => {
    if (!currentApplication) return;

    setIsLoading(true);
    try {
      await updateJobApplication(currentApplication.id, data);
      toast.success("Job application updated successfully");
      fetchApplications();
      setIsFormOpen(false);
      setCurrentApplication(undefined);
    } catch (error) {
      console.error("Error updating job application:", error);
      toast.error("Failed to update job application");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a job application
  const handleDeleteApplication = async () => {
    if (applicationToDelete === null) return;

    setIsLoading(true);
    try {
      await deleteJobApplication(applicationToDelete);
      toast.success("Job application deleted successfully");
      fetchApplications();
      setIsDeleteDialogOpen(false);
      setApplicationToDelete(null);
    } catch (error) {
      console.error("Error deleting job application:", error);
      toast.error("Failed to delete job application");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggling the starred status of a job application
  const handleToggleStar = async (id: number, starred: boolean) => {
    try {
      await toggleStarred(id, starred);
      setApplications(
        applications.map((app) => (app.id === id ? { ...app, starred } : app))
      );
    } catch (error) {
      console.error("Error toggling star:", error);
      toast.error("Failed to update starred status");
    }
  };

  // Open form for creating a new job application
  const handleAddNew = () => {
    setCurrentApplication(undefined);
    setIsFormOpen(true);
  };

  // Open form for editing an existing job application
  const handleEdit = (application: JobApplication) => {
    setCurrentApplication(application);
    setIsFormOpen(true);
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (id: number) => {
    setApplicationToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission (create or update)
  const handleFormSubmit = (data: JobApplicationFormData) => {
    if (currentApplication) {
      handleUpdateApplication(data);
    } else {
      handleCreateApplication(data);
    }
  };

  // Handle filter change
  const handleFilterChange = (value: boolean) => {
    setShowOnlyStarred(value);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar onAddNew={handleAddNew} />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8 mt-24">
        <ApplicationsContainer
          applications={applications}
          showOnlyStarred={showOnlyStarred}
          onFilterChange={handleFilterChange}
          onEdit={handleEdit}
          onDelete={handleOpenDeleteDialog}
          onToggleStar={handleToggleStar}
        />
      </div>

      <ApplicationFormModal
        isOpen={isFormOpen}
        currentApplication={currentApplication}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setIsFormOpen(false);
          setCurrentApplication(undefined);
        }}
        isLoading={isLoading}
      />

      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteApplication}
        isLoading={isLoading}
      />
      <Footer />
    </main>
  );
}
