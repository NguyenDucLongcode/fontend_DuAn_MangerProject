import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { DataUpdate } from "./types";

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
    showCreateModal: (state) => {
      state.type = "createRole";
    },
    updateRole: (state, action: PayloadAction<Partial<DataUpdate>>) => {
      state.dataUpdateRole = {
        ...state.dataUpdateRole,
        ...action.payload,
      };
    },
  },
});

export default modalRoleSlice.reducer;

export const { show, hide, showCreateModal, updateRole } =
  modalRoleSlice.actions;
