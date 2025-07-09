import axiosInstance from "@/lib/axios/axios.ts"; // CHÍNH XÁC
import { isAxiosError } from "axios";
import {
  CreateSubscriptionPayload,
  CreateSubscriptionResponse,
  FilterInput,
  PaginationResponse,
  SubscriptionResponse,
  UpdateSubscriptionPayload,
  UpdateSubscriptionResponse,
} from "./type";

export const GetSupscriptionPagination = async (
  payloadFilter: FilterInput
): Promise<PaginationResponse> => {
  const { limit, page, plan, userId, fromDate, toDate } = payloadFilter;

  const queryParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    plan: plan || "",
    userId: userId || "",
    fromDate: fromDate || "",
    toDate: toDate || "",
  }).toString();

  try {
    const res = await axiosInstance.get(
      `/subscription/pagination?${queryParams}`
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get supscription detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PostCreateSubscription = async (
  payload: CreateSubscriptionPayload
): Promise<CreateSubscriptionResponse> => {
  try {
    const res = await axiosInstance.post(`/subscription/create`, payload);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Create subscription failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchUpdateSubscription = async (
  payload: UpdateSubscriptionPayload
): Promise<UpdateSubscriptionResponse> => {
  try {
    const res = await axiosInstance.patch(
      `/subscription/update?id=${payload.id}`,
      {
        userId: payload.userId,
        plan: payload.plan,
        price: payload.price,
        expiresAt: payload.expiresAt,
      }
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Update subscription failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteSubscription = async (
  subscriptionId: string
): Promise<SubscriptionResponse> => {
  try {
    const res = await axiosInstance.delete(
      `/subscription/delete?id=${subscriptionId}`
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Delete subscription failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
