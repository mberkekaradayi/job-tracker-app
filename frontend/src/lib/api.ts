import axios from "axios";
import { JobApplication, JobApplicationFormData } from "@/types";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getJobApplications = async (): Promise<JobApplication[]> => {
  const response = await api.get("/job_applications");
  return response.data;
};

export const getJobApplication = async (
  id: number
): Promise<JobApplication> => {
  const response = await api.get(`/job_applications/${id}`);
  return response.data;
};

export const createJobApplication = async (
  data: JobApplicationFormData
): Promise<JobApplication> => {
  const response = await api.post("/job_applications", {
    job_application: data,
  });
  return response.data;
};

export const updateJobApplication = async (
  id: number,
  data: Partial<JobApplicationFormData>
): Promise<JobApplication> => {
  const response = await api.patch(`/job_applications/${id}`, {
    job_application: data,
  });
  return response.data;
};

export const deleteJobApplication = async (id: number): Promise<void> => {
  await api.delete(`/job_applications/${id}`);
};

export const toggleStarred = async (
  id: number,
  starred: boolean
): Promise<JobApplication> => {
  return updateJobApplication(id, { starred });
};
