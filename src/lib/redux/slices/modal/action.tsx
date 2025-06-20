import {
  setShowModalUserFilterDate,
  setShowModalUserUpdate,
  setShowModalUserDelete,
  setShowModalUserCreate,
  setShowModalGroupFilterDate,
  setShowModalGroupCreate,
  setShowModalGroupUpdate,
  setShowModalGroupDelete,
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
