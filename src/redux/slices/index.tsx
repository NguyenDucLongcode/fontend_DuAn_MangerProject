import authReducer, { login, logout } from "./auth";

//  reducers group
export const reducers = {
  authReducer,
};

//  actions group
export const actions = {
  auth: { login, logout },
};
