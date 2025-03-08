import { useLoginMutation, useRegisterMutation } from "./authApi/authApi";
import {
  useGetPaginationQuery,
  useDeleteUserMutation,
  useGetAllGroupQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "./userApi/userApi";

const apiHooks = {
  //auth
  Login: useLoginMutation,
  Register: useRegisterMutation,

  // userApi
  GetPagination: useGetPaginationQuery,
  DeleteUser: useDeleteUserMutation,
  GetAllGroup: useGetAllGroupQuery,
  CreateUser: useCreateUserMutation,
  GetUserById: useGetUserByIdQuery,
  UpdateUser: useUpdateUserMutation,
};

export default apiHooks;
