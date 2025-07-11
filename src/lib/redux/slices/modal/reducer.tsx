import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    //user
    setShowModalUserFilterDate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isFilterDateUser = action.payload;
    },
    setShowModalUserUpdate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isUpdateUser = action.payload;
    },
    setShowModalUserDelete: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteUser = action.payload;
    },
    setShowModalUserCreate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isCreateUser = action.payload;
    },

    // group Dev
    setShowModalGroupUpdate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isUpdateGroup = action.payload;
    },
    setShowModalGroupCreate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isCreategroup = action.payload;
    },
    setShowModalGroupFilterDate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isFilterDateGroup = action.payload;
    },
    setShowModalGroupDelete: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteGroup = action.payload;
    },
    // detail groupId
    setShowListMember: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isShowListMember = action.payload;
    },

    // project
    setShowModalProjectUpdate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isUpdateProject = action.payload;
    },
    setShowModalProjectCreate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isCreateProject = action.payload;
    },
    setShowModalProjectFilterDate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isFilterDateProject = action.payload;
    },
    setShowModalProjectDelete: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteProject = action.payload;
    },

    //avatar detail
    setShowModalDetailAvatar: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isShowModalAvatar = action.payload;
    },
    setDelateMemberToGroup: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteMember = action.payload;
    },
    setShowLeaderFromGroup: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isShowLeaderFromGroup = action.payload;
    },
    setShowProjectFromGroup: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isShowProjectFromGroup = action.payload;
    },
    setDeleteProjectFromGroup: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteProjectFromGroup = action.payload;
    },

    // Subscription
    setShowModalSubscriptiontUpdate: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.modalUser.isUpdateSubscription = action.payload;
    },
    setShowModalSubscriptionCreate: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isCreateSubscription = action.payload;
    },
    setShowModalSubscriptionFilterDate: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.modalUser.isFilterDateSubscription = action.payload;
    },
    setShowModalSubscriptionDelete: (state, action: PayloadAction<boolean>) => {
      state.modalUser.isDeleteSubscription = action.payload;
    },
  },
});

export const {
  // avatar detail
  setShowModalDetailAvatar,
  //user
  setShowModalUserFilterDate,
  setShowModalUserUpdate,
  setShowModalUserDelete,
  setShowModalUserCreate,

  // group dev
  setShowModalGroupFilterDate,
  setShowModalGroupCreate,
  setShowModalGroupUpdate,
  setShowModalGroupDelete,
  // detail groupId
  setShowListMember,
  setDelateMemberToGroup,
  setShowLeaderFromGroup,
  setShowProjectFromGroup,
  setDeleteProjectFromGroup,

  //project
  setShowModalProjectUpdate,
  setShowModalProjectCreate,
  setShowModalProjectFilterDate,
  setShowModalProjectDelete,

  // subscription
  setShowModalSubscriptiontUpdate,
  setShowModalSubscriptionCreate,
  setShowModalSubscriptionFilterDate,
  setShowModalSubscriptionDelete,
} = ModalSlice.actions;
export default ModalSlice.reducer;
