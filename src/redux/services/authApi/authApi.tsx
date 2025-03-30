// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Tạo API slice
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", // allow receive cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "api/v1/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
