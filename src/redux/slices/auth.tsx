import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  account: object;
  isAuthenticated: boolean;
}

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
