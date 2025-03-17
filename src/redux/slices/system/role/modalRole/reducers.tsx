import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { DataUpdate, DataCreate } from "./types";

const modalRoleSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{ data: PaginationRoleData; type: string }>
    ) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
      state.roleId = action.payload.data?.id;
    },
    hide: (state) => {
      state.data = {};
      state.type = "";
    },

    updateRole: (state, action: PayloadAction<Partial<DataUpdate>>) => {
      state.dataUpdateRole = {
        ...state.dataUpdateRole,
        ...action.payload,
      };
    },

    createRole: (state, action: PayloadAction<Partial<DataCreate>>) => {
      state.dataCreateRole = {
        ...state.dataCreateRole,
        ...action.payload,
      };
    },
  },
});

export default modalRoleSlice.reducer;

export const { show, hide, updateRole, createRole } = modalRoleSlice.actions;
