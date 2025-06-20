import {
  setShowModalUserFilterDate,
  setShowModalUserUpdate,
  setShowModalUserDelete,
  setShowModalUserCreate,
} from "./reducer";

export const setShowModalUser = {
  filterDate: setShowModalUserFilterDate,
  userUpdate: setShowModalUserUpdate,
  userDelete: setShowModalUserDelete,
  userCreate: setShowModalUserCreate,
};
