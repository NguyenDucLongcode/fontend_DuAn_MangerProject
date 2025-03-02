import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import {
  DataSubmitCreateUser,
  DataSubmitUpdateUser,
  IdentityUser,
} from "./types";

const modalUserSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{ data: IdentityUser; type: string }>
    ) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
      state.userId = action.payload.data?.id;
    },
    hide: (state) => {
      state.data = {};
      state.type = "";
    },
    togglePassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    showCreateModal: (state) => {
      state.type = "createUser";
    },

    createUser: (
      state,
      action: PayloadAction<Partial<DataSubmitCreateUser>>
    ) => {
      state.dataCreateUser = { ...state.dataCreateUser, ...action.payload };
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<DataSubmitUpdateUser>>
    ) => {
      state.dataUpdateUser = {
        ...state.dataUpdateUser,
        ...action.payload,
        id: action.payload.id ?? state.dataUpdateUser.id,
        groupId: action.payload.groupId ?? state.dataUpdateUser.groupId,
      };
    },
  },
});

export default modalUserSlice.reducer;

export const {
  show,
  hide,
  createUser,
  togglePassword,
  showCreateModal,
  updateUser,
} = modalUserSlice.actions;
