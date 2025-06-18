import axiosInstance from "@/lib/axios/axios.ts"; // CHÍNH XÁC
import { isAxiosError } from "axios";
import { FilterInput, PaginationResponse, UserDetailResponse } from "./type";

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
    console.log("check, api", queryParams);
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
