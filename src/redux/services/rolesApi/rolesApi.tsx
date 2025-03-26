import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customApi";
import { RolesResponse } from "./type";

export const rolesApi = createApi({
  reducerPath: "roles",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPaginationRole: builder.query<
      RolesResponse,
      {
        page: number;
        limit: number;
        url: string;
        description: string;
      }
    >({
      query: ({ page, limit, url, description }) => ({
        url: `api/v1/role/read?page=${page}&limit=${limit}&url=${url}&description=${description}`,
        method: "GET",
      }),
    }),
    deleteRole: builder.mutation({
      query: (id: number) => ({
        url: `api/v1/role/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
    updateRole: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/role/update",
        method: "PUT",
        body: data,
      }),
    }),
    createRole: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/role/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllRoleByIdGroup: builder.query({
      query: (groupId: number) => ({
        url: `api/v1/role/getAllRoleByIdGroup?id=${groupId}`,
        method: "GET",
      }),
    }),
    assignAddRole: builder.mutation({
      query: (data: object) => ({
        url: "api/v1/role/assignAddRole",
        method: "POST",
        body: data,
      }),
    }),
    assignRemoveRole: builder.mutation({
      query: ({ id, groupId }: { id: number; groupId: number }) => ({
        url: `api/v1/role/assignRemoveRole?id=${id}&groupId=${groupId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPaginationRoleQuery,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useCreateRoleMutation,
  useGetAllRoleByIdGroupQuery,
  useAssignAddRoleMutation,
  useAssignRemoveRoleMutation,
} = rolesApi;
