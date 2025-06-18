import axios from "axios";
import { useDeviceStore } from "../deviceStore";
import { store } from "@/lib/redux/store";
import { toast } from "react-toastify";
import { refresh_token } from "@/services/auth.services/auth.services";
import { login } from "../redux/slices/auth/reducer";
import { findUserFromToken } from "@/utils/token/decodeTokenFindUser";

let isRefreshing = false;

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const token: string | null = store.getState().auth?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (typeof window !== "undefined") {
    const { deviceId } = useDeviceStore.getState();
    config.headers["x-device-id"] = deviceId || "unknown-device";
  }

  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Nếu 401 và chưa refresh
    if (
      (status === 401 || status === 403) &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await refresh_token();
        if (res.statusCode === 200) {
          const { access_token } = res.data;
          const user = await findUserFromToken(access_token);
          store.dispatch(login({ access_token, user }));

          // Cập nhật header token mới cho request cũ và retry
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh thất bại", err);
        // Có thể redirect về login nếu muốn
      } finally {
        isRefreshing = false;
      }
    }
    // Các lỗi khác
    if (status === 400) toast.error("Yêu cầu không hợp lệ!");
    if (status === 403) toast.error("Bạn không có quyền truy cập!");
    if (status === 404) toast.error("Không tìm thấy tài nguyên!");
    if (status === 500) toast.error("Lỗi máy chủ!");

    return Promise.reject(error);
  }
);

export default axiosInstance;
