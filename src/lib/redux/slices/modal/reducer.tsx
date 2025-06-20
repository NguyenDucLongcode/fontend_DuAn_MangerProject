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
    setShowModalUserDelete: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteUser = action.payload;
    },
    setShowModalUserCreate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isCreateUser = action.payload;
    },
  },
});

export const {
  setShowModalUserFilterDate,
  setShowModalUserUpdate,
  setShowModalUserDelete,
  setShowModalUserCreate,
} = ModalSlice.actions;
export default ModalSlice.reducer;
