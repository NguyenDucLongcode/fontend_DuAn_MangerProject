import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
// import { DataUpdate, DataCreate } from "./types";

const modalProjectSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{ data: PaginationProjectData; type: string }>
    ) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
      state.projectId = action.payload.data?.id;
    },
    hide: (state) => {
      state.data = {};
      state.type = "";
    },

    // updateRole: (state, action: PayloadAction<Partial<DataUpdate>>) => {
    //   state.dataUpdateRole = {
    //     ...state.dataUpdateRole,
    //     ...action.payload,
    //   };
    // },

    // createRole: (state, action: PayloadAction<Partial<DataCreate>>) => {
    //   state.dataCreateRole = {
    //     ...state.dataCreateRole,
    //     ...action.payload,
    //   };
    // },
  },
});

export default modalProjectSlice.reducer;

export const { show, hide } = modalProjectSlice.actions;
