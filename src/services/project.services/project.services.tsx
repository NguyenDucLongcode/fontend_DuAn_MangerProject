import axiosInstance from "@/lib/axios/axios.ts"; // CHÍNH XÁC
import { isAxiosError } from "axios";
import {
  CreateProjectPayload,
  CreateProjectResponse,
  FilterInput,
  PaginationResponse,
  ProjectDetailResponse,
  ProjectResponse,
  UpdateProjectPayload,
  UpdateProjectResponse,
} from "./type";

export const GetProjectDetail = async (
  projectId: string
): Promise<ProjectDetailResponse> => {
  try {
    const res = await axiosInstance.get(`/projects?id=${projectId}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get project detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const ProjectPagination = async (
  payloadFilter: FilterInput
): Promise<PaginationResponse> => {
  const { limit, page, name, groupId, fromDate, toDate } = payloadFilter;

  const queryParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    name: name || "",
    groupId: groupId || "",
    fromDate: fromDate || "",
    toDate: toDate || "",
  }).toString();

  try {
    const res = await axiosInstance.get(`/projects/pagination?${queryParams}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get projects detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PostCreateProject = async (
  dataUpdateProject: CreateProjectPayload
): Promise<CreateProjectResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateProject.name);
    formData.append("groupId", dataUpdateProject.groupId);
    formData.append("description", dataUpdateProject.description);
    if (dataUpdateProject.avatar) {
      formData.append("file", dataUpdateProject.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.post(`/projects/create`, formData);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Create project failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchUpdateProject = async (
  dataUpdateProject: UpdateProjectPayload
): Promise<UpdateProjectResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateProject.name);
    formData.append("description", dataUpdateProject.description);
    formData.append("groupId", dataUpdateProject.groupId);
    if (dataUpdateProject.avatar) {
      formData.append("file", dataUpdateProject.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.patch(
      `/projects/update?id=${dataUpdateProject.id}`,
      formData
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Update project failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteProject = async (
  projectId: string
): Promise<ProjectResponse> => {
  try {
    const res = await axiosInstance.delete(`/projects/delete?id=${projectId}`);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Delete project failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
