import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { DataSubmitLogin, DataSubmitRegister } from "./type";

const authFlowSlice = createSlice({
  name: "authFlow",
  initialState,
  reducers: {
    getDataInputLogin: (
      state,
      action: PayloadAction<Partial<DataSubmitLogin>>
    ) => {
      state.dataSubmitLogin = { ...state.dataSubmitLogin, ...action.payload };
    },
    getDataInputRegister: (
      state,
      action: PayloadAction<Partial<DataSubmitRegister>>
    ) => {
      state.dataSubmitRegister = {
        ...state.dataSubmitRegister,
        ...action.payload,
      };
    },
    togglePassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export const { getDataInputLogin, getDataInputRegister, togglePassword } =
  authFlowSlice.actions;
export default authFlowSlice.reducer;
