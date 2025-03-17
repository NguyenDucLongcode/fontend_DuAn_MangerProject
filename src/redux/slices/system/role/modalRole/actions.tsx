import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAxios } from "@/axios";
import { show, hide, updateRole, createRole } from "./reducers";
import { DataUpdate } from "./types";

const mapUserData = (userId: number, data: DataUpdate) => ({
  id: userId,
  url: data.url,
  description: data.description,
});

// Action async
export const fetchRoleById = createAsyncThunk(
  "modal/fetchRoleById",
  async (userId: number, { dispatch }) => {
    try {
      const dataRoleByIdApi = await apiAxios.role.fetchRoleById(userId);

      if (dataRoleByIdApi) {
        dispatch(updateRole(mapUserData(userId, dataRoleByIdApi.data)));
      }
    } catch (error) {
      console.error("API error:", error);
    }
  }
);
// actions
export { show, hide, updateRole, createRole };
