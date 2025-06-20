export interface ModalState {
  modalUser: ModalUser;
}

interface ModalUser {
  isFilterDate: boolean;
  isUpdateUser: boolean;
  isDeleteUser: boolean;
  isCreateUser: boolean;
}
