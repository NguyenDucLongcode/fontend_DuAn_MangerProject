import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { LoginPayload } from "./type";

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.accountUser = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.accountUser = null;
      state.access_token = "";
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
