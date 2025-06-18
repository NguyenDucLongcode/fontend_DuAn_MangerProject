import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

const DataPickerSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<string>) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action: PayloadAction<string>) => {
      state.toDate = action.payload;
    },
  },
});

export const { setFromDate, setToDate } = DataPickerSlice.actions;
export default DataPickerSlice.reducer;
