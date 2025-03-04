import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getPagination: builder.query({
      query: ({ page, limit }) => ({
        url: `api/v1/pagination_User?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `api/v1/delete_user?id=${id}`,
        method: "DELETE",
      }),
    }),
    getAllGroup: builder.query<GroupResponse, void>({
      query: () => ({
        url: `api/v1/getAllGroup`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/create_user",
        method: "POST",
        body: data,
      }),
    }),
    getUserById: builder.query<getUserByIdRequest, number>({
      query: (userId: number) => ({
        url: `api/v1/getUseById?id=${userId}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data: object) => ({
        url: "http://localhost:8080/api/v1/update_user",
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
