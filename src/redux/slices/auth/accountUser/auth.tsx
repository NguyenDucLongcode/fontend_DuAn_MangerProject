import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountState } from "./type";

const initialState: AccountState = {
  account: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = {};
      state.isAuthenticated = false;
    },
    login: (state, action: PayloadAction<object>) => {
      state.account = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
