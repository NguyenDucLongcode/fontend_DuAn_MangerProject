import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUser,
  show,
  hide,
  createUser,
  togglePassword,
  showCreateModal,
} from "./reducers";
import { DataSubmitUpdateUser, UserByIdApiResponse } from "./types";
import { userServices } from "@/axios";

const mapUserData = (
  userId: number,
  data: UserByIdApiResponse
): DataSubmitUpdateUser => ({
  id: userId,
  name: data.name || "",
  phone: data.phone || "",
  address: data.address || "",
  isCustomer: data.isCustomer || "",
  sex: data.sex || "",
  groupId: data.groupId ?? null,
});

// Action async
export const fetchUserById = createAsyncThunk(
  "modal/fetchUserById",
  async (userId: number, { dispatch }) => {
    try {
      const dataUserByIdApi = await userServices.fetchUserById(userId);
      console.log("check data", dataUserByIdApi);
      if (dataUserByIdApi) {
        dispatch(
          updateUser(
            mapUserData(userId, dataUserByIdApi.data as UserByIdApiResponse)
          )
        ); // Ép kiểu
      }
    } catch (error) {
      console.error("API error:", error);
    }
  }
);

// actins
export { show, hide, createUser, togglePassword, showCreateModal, updateUser };
