// store/refetchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
