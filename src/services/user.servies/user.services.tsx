import axiosInstance from "@/lib/axios/axios.ts"; // CHÍNH XÁC
import { isAxiosError } from "axios";
import {
  ChangeRole,
  ChangeRoleResponse,
  CreateUserPayload,
  CreateUserResponse,
  DeleteUserResponse,
  FilterInput,
  PaginationResponse,
  UpdateUserPayload,
  UpdateUserResponse,
  UserDetailResponse,
} from "./type";

export const GetUserDetail = async (
  userId: string
): Promise<UserDetailResponse> => {
  try {
    const res = await axiosInstance.get(`/users?id=${userId}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Get user detail failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const GetUserPagination = async (
  payloadFilter: FilterInput
): Promise<PaginationResponse> => {
  const { limit, page, name, email, role, isActive, fromDate, toDate } =
    payloadFilter;

  const queryParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    name: name || "",
    email: email || "",
    role: role || "",
    isActive: String(isActive),
    fromDate: fromDate || "",
    toDate: toDate || "",
  }).toString();

  try {
    const res = await axiosInstance.get(`/users/pagination?${queryParams}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Get user detail failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchUpdateUser = async (
  dataUpdateUser: UpdateUserPayload
): Promise<UpdateUserResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateUser.name);
    formData.append("phone", dataUpdateUser.phone);
    formData.append("address", dataUpdateUser.address);
    formData.append("gender", dataUpdateUser.gender);
    if (dataUpdateUser.avatar) {
      formData.append("file", dataUpdateUser.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.patch(
      `/users/update?id=${dataUpdateUser.id}`,
      formData
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchChangeRole = async (
  Payload: ChangeRole
): Promise<ChangeRoleResponse> => {
  try {
    const res = await axiosInstance.patch(
      `/users/change-role?id=${Payload.id}`,
      { role: Payload.role }
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteUser = async (
  userId: string
): Promise<DeleteUserResponse> => {
  try {
    const res = await axiosInstance.delete(`/users/delete?id=${userId}`);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PotCreateUser = async (
  dataUpdateUser: CreateUserPayload
): Promise<CreateUserResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateUser.name);
    formData.append("phone", dataUpdateUser.phone);
    formData.append("password", dataUpdateUser.password);
    formData.append("email", dataUpdateUser.email);
    formData.append("address", dataUpdateUser.address);
    formData.append("gender", dataUpdateUser.gender);
    formData.append("role", dataUpdateUser.role);
    if (dataUpdateUser.avatar) {
      formData.append("file", dataUpdateUser.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.post(`/users/create`, formData);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
