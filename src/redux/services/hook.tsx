import { useLoginMutation, useRegisterMutation } from "./authApi/authApi";
import {
  useGetPaginationQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "./userApi/userApi";
import { useGetAllGroupQuery } from "./groupApi/groupApi";
import {
  useGetPaginationRoleQuery,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useCreateRoleMutation,
  useGetAllRoleByIdGroupQuery,
  useAssignAddRoleMutation,
  useAssignRemoveRoleMutation,
} from "./rolesApi/rolesApi";

import { useGetPaginationProjectQuery } from "./projectApi/projectApi";

const apiHooks = {
  //auth
  auth: { Login: useLoginMutation, Register: useRegisterMutation },

  // userApi
  user: {
    GetPagination: useGetPaginationQuery,
    DeleteUser: useDeleteUserMutation,
    CreateUser: useCreateUserMutation,
    UpdateUser: useUpdateUserMutation,
  },
  // groupApi
  group: { GetAllGroup: useGetAllGroupQuery },
  // rolesApi
  roles: {
    GetPaginationRole: useGetPaginationRoleQuery,
    DeleteRole: useDeleteRoleMutation,
    UpdateRole: useUpdateRoleMutation,
    CreateRole: useCreateRoleMutation,
    GetAllRoleByIdGroup: useGetAllRoleByIdGroupQuery,
    AssignAddRole: useAssignAddRoleMutation,
    AssignRemoveRole: useAssignRemoveRoleMutation,
  },

  // projectApi
  project: { GetPaginationProject: useGetPaginationProjectQuery },
};

export default apiHooks;
