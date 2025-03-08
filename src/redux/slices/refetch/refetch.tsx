import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefetchState } from "./type";

const initialState: RefetchState = {
  refetchPagination: null,
};

const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    pagination: (state, action: PayloadAction<() => void>) => {
      state.refetchPagination = action.payload;
    },
  },
});

export const { pagination } = refetchSlice.actions;
export default refetchSlice.reducer;
