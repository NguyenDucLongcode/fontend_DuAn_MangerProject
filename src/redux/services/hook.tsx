import { useLoginMutation, useRegisterMutation } from "./authApi";
import {
  useGetPaginationQuery,
  useDeleteUserMutation,
  useGetAllGroupQuery,
  useCreateUserMutation,
} from "./userApi";

const apiHooks = {
  //auth
  Login: useLoginMutation,
  Register: useRegisterMutation,
  // userApi
  GetPagination: useGetPaginationQuery,
  DeleteUser: useDeleteUserMutation,
  GetAllGroup: useGetAllGroupQuery,
  CreateUser: useCreateUserMutation,
};

export default apiHooks;
