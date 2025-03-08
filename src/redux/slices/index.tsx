import authReducer, { login, logout, fetchUser } from "./auth/accountUser/auth";
import { modalUserReducer, modalUserActions } from "./modalUser";
import refetchReducer, { pagination } from "./refetch/refetch";
import { paginationReducer, paginationActions } from "./tablePagination";
import { authFlowReducer, authFlowActions } from "./auth/authFlowReducer";

//  reducers group
export const reducers = {
  authFlowData: authFlowReducer,
  modelUserData: modalUserReducer,
  refetchData: refetchReducer,
  paginationData: paginationReducer,
  authReducerData: authReducer,
};

//  actions group
export const actions = {
  auth: { login, logout, fetchUser },
  modalUser: modalUserActions,
  authFlow: authFlowActions,
  refetch: { pagination },
  Pagination: paginationActions,
};
