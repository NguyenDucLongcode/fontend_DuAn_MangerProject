export interface ModalState {
  modalUser: ModalUser;
}

interface ModalUser {
  // modal avatar
  isShowModalAvatar: boolean;
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
  // groupDev detail
  isShowListMember: boolean;
  isDeleteMember: boolean;
  isShowLeaderFromGroup: boolean;
  isShowProjectFromGroup: boolean;
  isDeleteProjectFromGroup: boolean;

  // project
  isFilterDateProject: boolean;
  isUpdateProject: boolean;
  isCreateProject: boolean;
  isDeleteProject: boolean;

  // subscription
  isFilterDateSubscription: boolean;
  isUpdateSubscription: boolean;
  isCreateSubscription: boolean;
  isDeleteSubscription: boolean;
}
