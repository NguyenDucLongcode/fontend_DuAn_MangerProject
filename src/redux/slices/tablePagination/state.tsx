import { PaginationType } from "./type";

export const initialState: PaginationType = {
  pageSize: 5,
  currentPage: 1,
  filterUser: {
    email: "",
    name: "",
    groupId: "",
  },
  filterRole: {
    url: "",
    description: "",
  },
};
