import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { RoleType } from "./types";

const AssignGroupSlice = createSlice({
  name: "assign",
  initialState,
  reducers: {
    getAllRoleWithIdGroup: (state, action: PayloadAction<RoleType[]>) => {
      state.dataAllRolesWithIdGroup = action.payload;
    },

    mapGroupId: (state, action: PayloadAction<number>) => {
      state.groupId = action.payload;
    },
    addRole: (state, action: PayloadAction<RoleType>) => {
      const newRole = action.payload;

      if (
        !state.dataAllRolesWithIdGroup?.some((role) => role.id === newRole.id)
      ) {
        state.dataAllRolesWithIdGroup.push(newRole);
      }
    },
    removeRole: (state, action: PayloadAction<number>) => {
      state.dataAllRolesWithIdGroup = state.dataAllRolesWithIdGroup?.filter(
        (role) => role.id !== action.payload
      );
    },
  },
});

export default AssignGroupSlice.reducer;

export const { getAllRoleWithIdGroup, addRole, removeRole, mapGroupId } =
  AssignGroupSlice.actions;
