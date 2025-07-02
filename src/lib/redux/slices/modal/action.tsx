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
};

export const setShowModalProject = {
  projectUpdate: setShowModalProjectUpdate,
  projectCreate: setShowModalProjectCreate,
  filterDate: setShowModalProjectFilterDate,
  projectDelete: setShowModalProjectDelete,
};

export const setShowAvatarDetail = {
  DetailAvatar: setShowModalDetailAvatar,
};
