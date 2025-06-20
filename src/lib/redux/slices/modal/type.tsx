export interface ModalState {
  modalUser: ModalUser;
}

interface ModalUser {
  //user
  isFilterDateUser: boolean;
  isUpdateUser: boolean;
  isDeleteUser: boolean;
  isCreateUser: boolean;

  // groupDev
  isFilterDateGroup: boolean;
  isUpdateGroup: boolean;
  isCreategroup: boolean;
  isDeleteGroup: boolean;
}
