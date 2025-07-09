import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { InforSubScription } from "./type";

const SubScriptionSlice = createSlice({
  name: "subScription",
  initialState,
  reducers: {
    setInforSubScription: (state, action: PayloadAction<InforSubScription>) => {
      state.inforSubScription = action.payload;
    },
  },
});

export const { setInforSubScription } = SubScriptionSlice.actions;
export default SubScriptionSlice.reducer;
