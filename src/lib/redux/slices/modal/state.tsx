import { ModalState } from "./type";

export const initialState: ModalState = {
  modalUser: {
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
  },
};
