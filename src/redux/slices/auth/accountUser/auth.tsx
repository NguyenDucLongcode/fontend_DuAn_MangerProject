import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AccountState, AccountStyle } from "./type";
import { fetchUserAccountCookies } from "@/axios/auth/auth";
import { AxiosResponse, AxiosError } from "axios";

const initialState: AccountState = {
  account: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Thunk để gọi API lấy thông tin user
export const fetchUser = createAsyncThunk<
  AccountStyle,
  void,
  { rejectValue: string }
>("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AccountStyle> | undefined =
      await fetchUserAccountCookies();
    if (!response) throw new Error("Không có dữ liệu từ server");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data || "Lỗi từ server");
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Lỗi không xác định");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    login: (state, action: PayloadAction<AccountStyle>) => {
      state.account = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.account = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Có lỗi xảy ra";
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
