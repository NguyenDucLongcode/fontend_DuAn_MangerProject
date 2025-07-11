import {
  setShowModalUserFilterDate,
  setShowModalUserUpdate,
  setShowModalUserDelete,
  setShowModalUserCreate,
  setShowModalGroupFilterDate,
  setShowModalGroupCreate,
  setShowModalGroupUpdate,
  setShowModalGroupDelete,
  setShowModalProjectUpdate,
  setShowModalProjectCreate,
  setShowModalProjectFilterDate,
  setShowModalProjectDelete,
  setShowListMember,
  setShowModalDetailAvatar,
  setDelateMemberToGroup,
  setShowLeaderFromGroup,
  setShowProjectFromGroup,
  setDeleteProjectFromGroup,
  setShowModalSubscriptiontUpdate,
  setShowModalSubscriptionCreate,
  setShowModalSubscriptionFilterDate,
  setShowModalSubscriptionDelete,
} from "./reducer";

export const setShowModalUser = {
  filterDate: setShowModalUserFilterDate,
  userUpdate: setShowModalUserUpdate,
  userDelete: setShowModalUserDelete,
  userCreate: setShowModalUserCreate,
};

export const setShowModalGroup = {
  filterDate: setShowModalGroupFilterDate,
  groupUpdate: setShowModalGroupUpdate,
  groupCreate: setShowModalGroupCreate,
  groupDelete: setShowModalGroupDelete,
};

export const setDetailGroupId = {
  listMember: setShowListMember,
  deleteMember: setDelateMemberToGroup,
  detailLeader: setShowLeaderFromGroup,
  detailProject: setShowProjectFromGroup,
  deleteProject: setDeleteProjectFromGroup,
};

export const setShowModalProject = {
  projectUpdate: setShowModalProjectUpdate,
  projectCreate: setShowModalProjectCreate,
  filterDate: setShowModalProjectFilterDate,
  projectDelete: setShowModalProjectDelete,
};

export const setShowModalSubscription = {
  update: setShowModalSubscriptiontUpdate,
  create: setShowModalSubscriptionCreate,
  filterDate: setShowModalSubscriptionFilterDate,
  delete: setShowModalSubscriptionDelete,
};

export const setShowAvatarDetail = {
  DetailAvatar: setShowModalDetailAvatar,
};
