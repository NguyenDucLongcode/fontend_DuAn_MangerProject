import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    paginationUser: (state, action: PayloadAction<() => void>) => {
      state.refetchPaginationUser = action.payload;
    },
    paginationRole: (state, action: PayloadAction<() => void>) => {
      state.refetchPaginationRole = action.payload;
    },
    paginationAssign: (state, action: PayloadAction<() => void>) => {
      state.refetchPaginationAssign = action.payload;
    },
    paginationProject: (state, action: PayloadAction<() => void>) => {
      state.refetchPaginationProject = action.payload;
    },
  },
});

export const {
  paginationUser,
  paginationRole,
  paginationAssign,
  paginationProject,
} = refetchSlice.actions;
export default refetchSlice.reducer;
