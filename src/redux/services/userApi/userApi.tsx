import { createApi } from "@reduxjs/toolkit/query/react";
import { PaginationResponse } from "./type";
import { customBaseQuery } from "../customApi";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPagination: builder.query<
      PaginationResponse,
      {
        page: number;
        limit: number;
        name: string;
        email: string;
        groupId: number | string;
      }
    >({
      query: ({ page, limit, name, email, groupId }) => ({
        url: `api/v1/user/read?page=${page}&limit=${limit}&name=${name}&email=${email}&groupId=${groupId}`,
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
  useUpdateUserMutation,
} = userApi;
