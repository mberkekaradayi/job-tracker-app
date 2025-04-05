import React from "react";
import { useForm } from "react-hook-form";
import { JobApplication, JobApplicationFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiBriefcase, FiUser, FiCalendar, FiTag, FiStar } from "react-icons/fi";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface JobApplicationFormProps {
  initialData?: JobApplication;
  onSubmit: (data: JobApplicationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS = [
  "Applied",
  "Phone Screening",
  "Interview",
  "Technical Assessment",
  "Offer",
  "Rejected",
  "Withdrawn",
];

// Form validation schema
const formSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  position_title: z.string().min(1, "Position title is required"),
  status: z.string(),
  applied_on: z.string(),
  starred: z.boolean(),
});

export function JobApplicationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: JobApplicationFormProps) {
  const form = useForm<JobApplicationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          company_name: "",
          position_title: "",
          status: "Applied",
          applied_on: new Date().toISOString().split("T")[0],
          starred: false,
        },
  });

  const handleSubmit = (data: JobApplicationFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="form-section">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <FiBriefcase className="h-4 w-4 text-primary" />
                  <span>Company Name</span>
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company name"
                    {...field}
                    disabled={isLoading}
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <FiUser className="h-4 w-4 text-primary" />
                  <span>Position Title</span>
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter position title"
                    {...field}
                    disabled={isLoading}
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <FiTag className="h-4 w-4 text-primary" />
                  <span>Status</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="focus-visible:ring-primary">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applied_on"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <FiCalendar className="h-4 w-4 text-primary" />
                  <span>Applied On</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    disabled={isLoading}
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="starred"
            render={({ field }) => (
              <div
                className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => field.onChange(!field.value)}
              >
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      field.onChange(!field.value);
                    }}
                    disabled={isLoading}
                    className="p-0 h-auto"
                  >
                    <FiStar
                      className={`h-5 w-5 ${
                        field.value
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>
                <div
                  className="space-y-1 leading-none w-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(!field.value);
                  }}
                >
                  <div className="flex items-center space-x-2 cursor-pointer font-medium">
                    <span>Star this application</span>
                  </div>
                  <div className="text-xs text-muted-foreground cursor-pointer">
                    Starred applications are easier to find and track.
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="button-outline"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="button-primary">
            {initialData ? "Update" : "Create"} Job Application
          </Button>
        </div>
      </form>
    </Form>
  );
}
