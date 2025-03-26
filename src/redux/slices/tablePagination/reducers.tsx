import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const PaginationSlice = createSlice({
  name: "Pagination",
  initialState,
  reducers: {
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilterUser: (state, action) => {
      state.filterUser = { ...state.filterUser, ...action.payload };
    },
    setFilterRole: (state, action) => {
      state.filterRole = { ...state.filterRole, ...action.payload };
    },
    setFilterProject: (state, action) => {
      state.filterProject = { ...state.filterProject, ...action.payload };
    },
  },
});

export const {
  setPageSize,
  setCurrentPage,
  setFilterUser,
  setFilterRole,
  setFilterProject,
} = PaginationSlice.actions;
export default PaginationSlice.reducer;
