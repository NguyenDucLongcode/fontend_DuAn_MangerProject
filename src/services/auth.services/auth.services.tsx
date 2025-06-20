import axiosInstance from "@/lib/axios/axios.ts";
import { LoginResponse, PayloadLogin, ReloadPageResponse } from "./type";
import { isAxiosError } from "axios";
import axios from "axios";

export const handlerLogin = async (
  payload: PayloadLogin
): Promise<LoginResponse> => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    const res = await axiosInstance.post("/auth/login", formData);
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

export const refresh_token = async (): Promise<LoginResponse> => {
  try {
    const deviceId = localStorage.getItem("deviceId");
    const res = await axios.post(
      "/auth/refresh-token",
      {},
      {
        baseURL:
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "http://localhost:8080/api/v1",
        withCredentials: true,
        headers: {
          "x-device-id": deviceId ?? "", // thêm deviceId vào header
        },
      }
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

export const GetUserReloadPage = async (): Promise<ReloadPageResponse> => {
  try {
    const res = await axiosInstance.get(`/auth/refresh_Account_User`, {});
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
