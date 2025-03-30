import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { apiAxios } from "@/axios";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    switch (result.error.status) {
      case 400:
        console.error("Bad Request: Dữ liệu không hợp lệ!");
        break;

      case 401:
        try {
          await apiAxios.auth.refresh_Token(); // call API refresh token

          // Nếu refresh thành công, thử lại request ban đầu
          result = await baseQuery(args, api, extraOptions);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
          // Đăng xuất hoặc chuyển hướng về trang đăng nhập
          window.location.href = "/login";
        }
        break;

      case 403:
        toast.error("Forbidden: Không có quyền!");
        break;
      case 500:
        console.error("Server Error: Lỗi hệ thống!");
        break;
      default:
        toast.error("Lỗi không xác định!");
    }
  }
  return result;
};
