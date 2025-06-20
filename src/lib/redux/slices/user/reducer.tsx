import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { InforUser } from "./type";

const UserSlice = createSlice({
  name: "use",
  initialState,
  reducers: {
    setInforUser: (state, action: PayloadAction<InforUser>) => {
      state.inforUser = action.payload;
    },
  },
});

export const { setInforUser } = UserSlice.actions;
export default UserSlice.reducer;
