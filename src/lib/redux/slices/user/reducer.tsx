import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { InforUser } from "./type";

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setInforUser: (state, action: PayloadAction<InforUser>) => {
      state.inforUser = action.payload;
    },
  },
});

export const { setInforUser } = ModalSlice.actions;
export default ModalSlice.reducer;
