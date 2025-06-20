import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    //user
    setShowModalUserFilterDate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isFilterDateUser = action.payload;
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

    // group Dev
    setShowModalGroupUpdate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isUpdateGroup = action.payload;
    },
    setShowModalGroupCreate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isCreategroup = action.payload;
    },
    setShowModalGroupFilterDate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isFilterDateGroup = action.payload;
    },
    setShowModalGroupDelete: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteGroup = action.payload;
    },
  },
});

export const {
  //user
  setShowModalUserFilterDate,
  setShowModalUserUpdate,
  setShowModalUserDelete,
  setShowModalUserCreate,

  // group dev
  setShowModalGroupFilterDate,
  setShowModalGroupCreate,
  setShowModalGroupUpdate,
  setShowModalGroupDelete,
} = ModalSlice.actions;
export default ModalSlice.reducer;
