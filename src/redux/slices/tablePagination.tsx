import { createSlice } from "@reduxjs/toolkit";

const initialState: PaginationType = {
  pageSize: 5,
  currentPage: 1,
  filterText: "",
  gotoPage: 1,
};

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
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    setGoToPage: (state, action) => {
      state.gotoPage = action.payload;
    },
  },
});

export const { setPageSize, setCurrentPage, setFilterText, setGoToPage } =
  PaginationSlice.actions;
export default PaginationSlice.reducer;
