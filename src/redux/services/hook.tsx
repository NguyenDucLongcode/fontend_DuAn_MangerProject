import { useLoginMutation, useRegisterMutation } from "./authApi/authApi";
import {
  useGetPaginationQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "./userApi/userApi";
import { useGetAllGroupQuery } from "./groupApi/groupApi";

const apiHooks = {
  //auth
  Login: useLoginMutation,
  Register: useRegisterMutation,

  // userApi
  GetPagination: useGetPaginationQuery,
  DeleteUser: useDeleteUserMutation,
  CreateUser: useCreateUserMutation,
  GetUserById: useGetUserByIdQuery,
  UpdateUser: useUpdateUserMutation,
  // groupApi
  GetAllGroup: useGetAllGroupQuery,
};

export default apiHooks;
