import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModalUserFilterDate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isFilterDate = action.payload;
    },
    setShowModalUserUpdate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isUpdateUser = action.payload;
    },
  },
});

export const { setShowModalUserFilterDate, setShowModalUserUpdate } =
  ModalSlice.actions;
export default ModalSlice.reducer;
