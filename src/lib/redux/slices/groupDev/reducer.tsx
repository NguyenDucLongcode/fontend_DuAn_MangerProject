import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { InforGroup } from "./type";

const GroupDevSlice = createSlice({
  name: "groupDev",
  initialState,
  reducers: {
    setInforGroupDev: (state, action: PayloadAction<InforGroup>) => {
      state.inforGroup = action.payload;
    },
  },
});

export const { setInforGroupDev } = GroupDevSlice.actions;
export default GroupDevSlice.reducer;
