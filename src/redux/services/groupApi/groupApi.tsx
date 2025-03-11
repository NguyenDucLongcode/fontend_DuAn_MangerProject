import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customApi";
import { GroupResponse } from "./type";

export const groupApi = createApi({
  reducerPath: "group",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAllGroup: builder.query<GroupResponse, void>({
      query: () => ({
        url: `api/v1/group/read`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllGroupQuery } = groupApi;
