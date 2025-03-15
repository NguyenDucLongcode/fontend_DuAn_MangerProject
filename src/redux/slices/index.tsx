import authReducer, { login, logout, fetchUser } from "./auth/accountUser/auth";
import { modalUserReducer, modalUserActions } from "./system/user/modalUser";
import { modalRoleReducer, modalRoleActions } from "./system/role/modalRole";
import { refetchReducer, refetchActions } from "./refetch";
import { paginationReducer, paginationActions } from "./tablePagination";
import { authFlowReducer, authFlowActions } from "./auth/authFlowReducer";

//  reducers group
export const reducers = {
  authFlowData: authFlowReducer,
  modelUserData: modalUserReducer,
  modelRoleData: modalRoleReducer,
  refetchData: refetchReducer,
  paginationData: paginationReducer,
  authReducerData: authReducer,
};

//  actions group
export const actions = {
  auth: { login, logout, fetchUser },
  modalUser: modalUserActions,
  modalRole: modalRoleActions,
  authFlow: authFlowActions,
  refetch: refetchActions,
  Pagination: paginationActions,
};
