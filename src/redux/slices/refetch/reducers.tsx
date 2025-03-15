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
  },
});

export const { paginationUser, paginationRole } = refetchSlice.actions;
export default refetchSlice.reducer;
