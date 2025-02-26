import authReducer, { login, logout } from "./auth";
import modalUserReducer, {
  show,
  hide,
  createUser,
  togglePassword,
} from "./modelUser";
import refetchReducer, { pagination } from "./refetch";
import PaginationReducer, {
  setCurrentPage,
  setFilterText,
  setPageSize,
  setGoToPage,
} from "./tablePagination";

//  reducers group
export const reducers = {
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
  modalUser: { show, hide, createUser, togglePassword },
  refetch: { pagination },
  Pagination: { setCurrentPage, setFilterText, setPageSize, setGoToPage },
};
