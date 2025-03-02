// store/refetchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RefetchState = {
  refetchPagination: null,
  refetchModalUpdateUser: null,
};

const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    pagination: (state, action: PayloadAction<() => void>) => {
      state.refetchPagination = action.payload;
    },
    modalUpdateUser: (state, action: PayloadAction<() => void>) => {
      state.refetchModalUpdateUser = action.payload;
    },
  },
});

export const { pagination, modalUpdateUser } = refetchSlice.actions;
export default refetchSlice.reducer;
