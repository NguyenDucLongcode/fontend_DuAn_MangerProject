import { createApi } from "@reduxjs/toolkit/query/react";
import { GetUserByIdRequest, PaginationResponse } from "./type";
import { customBaseQuery } from "../customApi";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPagination: builder.query<
      PaginationResponse,
      { page: number; limit: number }
    >({
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
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;
