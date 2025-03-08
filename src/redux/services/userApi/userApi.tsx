import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { GetUserByIdRequest, GroupResponse } from "./type";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    switch (result.error.status) {
      case 400:
        console.error("Bad Request: Dữ liệu không hợp lệ!");
        break;
      case 401:
        toast.error("Unauthorized: Chưa đăng nhập!");
        // window.location.replace("/login");
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

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPagination: builder.query({
      query: ({ page, limit }) => ({
        url: `api/v1/user/read?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `api/v1/user/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
    getAllGroup: builder.query<GroupResponse, void>({
      query: () => ({
        url: `api/v1/group/read`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/user/create",
        method: "POST",
        body: data,
      }),
    }),
    getUserById: builder.query<GetUserByIdRequest, number>({
      query: (userId: number) => ({
        url: `api/v1/getUseById?id=${userId}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/user/update",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPaginationQuery,
  useDeleteUserMutation,
  useGetAllGroupQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;
