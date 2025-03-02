import authReducer, { login, logout } from "./auth/accountUser/auth";
import { modalUserReducer, modalUserActions } from "./modalUser";
import refetchReducer, { pagination, modalUpdateUser } from "./refetch/refetch";
import PaginationReducer, {
  setCurrentPage,
  setFilterText,
  setPageSize,
  setGoToPage,
} from "./tablePagination";
import { authFlowReducer, authFlowActions } from "./auth/authFlowReducer";

//  reducers group
export const reducers = {
  authFlowData: authFlowReducer,
  modelUserData: modalUserReducer,
  refetchData: refetchReducer,
  paginationData: PaginationReducer,
};

export const persisted = {
  authReducer,
};

//  actions group
export const actions = {
  auth: { login, logout },
  modalUser: modalUserActions,
  authFlow: authFlowActions,
  refetch: { pagination, modalUpdateUser },
  Pagination: { setCurrentPage, setFilterText, setPageSize, setGoToPage },
};
