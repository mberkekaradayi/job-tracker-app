export interface JobApplication {
  id: number;
  company_name: string;
  position_title: string;
  status: string;
  applied_on: string;
  starred: boolean;
  created_at?: string;
  updated_at?: string;
}

export type JobApplicationFormData = Omit<
  JobApplication,
  "id" | "created_at" | "updated_at"
>;
