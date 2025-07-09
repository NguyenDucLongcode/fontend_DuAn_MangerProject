import axios, { InternalAxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { useDeviceStore } from "../deviceStore";
import { store } from "@/lib/redux/store";
import { toast } from "react-toastify";
import { refresh_token } from "@/services/auth.services/auth.services";
import { login } from "../redux/slices/auth/reducer";
import { findUserFromToken } from "@/utils/token/decodeTokenFindUser";
import { isTokenExpired } from "@/utils/token/jwt";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

// Cấu hình NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

// Hàm xử lý hàng đợi khi token đã có
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
  validateStatus: () => true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(async (config) => {
  let token = store.getState().auth?.access_token;

  if (token && isTokenExpired(token)) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const res = await refresh_token();
        if (res.statusCode === 200) {
          token = res.data.access_token;
          const user = await findUserFromToken(token);
          store.dispatch(login({ access_token: token, user }));
          processQueue(null, token);
        }
      } catch (err) {
        processQueue(err, null);
        console.error("Token refresh thất bại (request)", err);
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
      failedQueue.push({
        resolve: (newToken) => {
          if (newToken && typeof newToken === "string") {
            config.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(config);
        },
        reject: (err) => reject(err),
      });
    });
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (typeof window !== "undefined") {
    const { deviceId } = useDeviceStore.getState();
    config.headers["x-device-id"] = deviceId || "unknown-device";
  }

  NProgress.start();
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Nếu 401/403 và chưa retry
    if (
      (status === 401 || status === 403) &&
      !originalRequest._retry &&
      !originalRequest._retryingWithNewToken
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await refresh_token();
          if (res.statusCode === 200) {
            const { access_token } = res.data;
            const user = await findUserFromToken(access_token);
            store.dispatch(login({ access_token, user }));
            processQueue(null, access_token);
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          processQueue(err, null);
          console.error("Token refresh thất bại (response)", err);
        } finally {
          isRefreshing = false;
        }
      }

      // Nếu đang refresh → chờ token rồi retry
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken) => {
            if (newToken && typeof newToken === "string") {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              originalRequest._retryingWithNewToken = true;
            }
            resolve(axiosInstance(originalRequest));
          },
          reject: (err) => reject(err),
        });
      });
    }

    // Các lỗi khác
    if (status === 400) toast.error("Yêu cầu không hợp lệ!");
    if (status === 403) toast.error("Bạn không có quyền truy cập!");
    if (status === 404) toast.error("Không tìm thấy tài nguyên!");
    if (status === 500) toast.error("Lỗi máy chủ!");

    NProgress.done();
    return Promise.reject(error);
  }
);

export default axiosInstance;
