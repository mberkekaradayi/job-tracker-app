import React from "react";
import { JobApplication, JobApplicationFormData } from "@/types";
import { JobApplicationForm } from "./JobApplicationForm";
import { FiEdit2, FiPlus } from "react-icons/fi";

interface ApplicationFormModalProps {
  isOpen: boolean;
  currentApplication?: JobApplication;
  onSubmit: (data: JobApplicationFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ApplicationFormModal({
  isOpen,
  currentApplication,
  onSubmit,
  onCancel,
  isLoading,
}: ApplicationFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-xl p-6 w-full max-w-md border border-border/50 form-container animate-in fade-in duration-200">
        <div className="flex items-center space-x-2 mb-6">
          {currentApplication ? (
            <FiEdit2 className="h-5 w-5 text-primary" />
          ) : (
            <FiPlus className="h-5 w-5 text-primary" />
          )}
          <h2 className="text-xl font-bold">
            {currentApplication
              ? "Edit Job Application"
              : "Add New Job Application"}
          </h2>
        </div>

        <JobApplicationForm
          initialData={currentApplication}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
