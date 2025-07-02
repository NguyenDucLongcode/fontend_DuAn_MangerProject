import { ModalState } from "./type";

export const initialState: ModalState = {
  modalUser: {
    // avatar
    isShowModalAvatar: false,
    //user
    isFilterDateUser: false,
    isUpdateUser: false,
    isDeleteUser: false,
    isCreateUser: false,

    // groupDev
    isFilterDateGroup: false,
    isUpdateGroup: false,
    isCreategroup: false,
    isDeleteGroup: false,

    // detail groupId
    isShowListMember: false,
    isDeleteMember: false,
    isShowLeaderFromGroup: false,

    // project
    isFilterDateProject: false,
    isUpdateProject: false,
    isCreateProject: false,
    isDeleteProject: false,
  },
};
