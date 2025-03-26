import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customApi";
import { ProjectPaginationResponse } from "./type";

export const projectApi = createApi({
  reducerPath: "project",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPaginationProject: builder.query<
      ProjectPaginationResponse,
      {
        page: number;
        limit: number;
        name: string;
        description: string;
      }
    >({
      query: ({ page, limit, name, description }) => ({
        url: `api/v1/project/read?description=${description}&limit=${limit}&page=${page}&name=${name}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaginationProjectQuery } = projectApi;
