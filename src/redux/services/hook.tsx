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
} from "./rolesApi/rolesApi";

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
  },
};

export default apiHooks;
