import axiosInstance from "@/lib/axios/axios.ts"; // CHÍNH XÁC
import { isAxiosError } from "axios";
import {
  CreateGroupPayload,
  CreateGroupResponse,
  DeleteGroupResponse,
  FilterInput,
  GroupDevDetailResponse,
  PaginationResponse,
  UpdateGroupPayload,
  UpdateGroupResponse,
} from "./type";

export const GetGroupDetail = async (
  groupId: string
): Promise<GroupDevDetailResponse> => {
  try {
    const res = await axiosInstance.get(`/group-dev?id=${groupId}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get group Dev detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const GetGroupDevPagination = async (
  payloadFilter: FilterInput
): Promise<PaginationResponse> => {
  const { limit, page, name, visibility, maxMembers, fromDate, toDate } =
    payloadFilter;

  const queryParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    name: name || "",
    visibility: visibility || "",
    maxMembers: maxMembers || "",
    fromDate: fromDate || "",
    toDate: toDate || "",
  }).toString();

  try {
    const res = await axiosInstance.get(`/group-dev/pagination?${queryParams}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get group dev detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PostCreateGroup = async (
  dataUpdateGroup: CreateGroupPayload
): Promise<CreateGroupResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateGroup.name);
    formData.append("description", dataUpdateGroup.description);
    formData.append("visibility", dataUpdateGroup.visibility);
    formData.append("maxMembers", dataUpdateGroup.maxMembers);
    if (dataUpdateGroup.avatar) {
      formData.append("file", dataUpdateGroup.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.post(`/group-dev/create`, formData);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Create group failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchUpdateGroupDev = async (
  dataUpdateGroup: UpdateGroupPayload
): Promise<UpdateGroupResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateGroup.name);
    formData.append("description", dataUpdateGroup.description);
    formData.append("visibility", dataUpdateGroup.visibility);
    formData.append("maxMembers", dataUpdateGroup.maxMembers);
    if (dataUpdateGroup.avatar) {
      formData.append("file", dataUpdateGroup.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.patch(
      `/group-dev/update?id=${dataUpdateGroup.id}`,
      formData
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Update group dev failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteGroupDev = async (
  groupId: string
): Promise<DeleteGroupResponse> => {
  try {
    const res = await axiosInstance.delete(`/group-dev/delete?id=${groupId}`);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Delete group failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
