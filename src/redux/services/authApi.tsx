// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Tạo API slice
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
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
        url: "api/v1/create_user",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
