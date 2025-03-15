import { authApi } from "./authApi/authApi";
import { userApi } from "./userApi/userApi";
import { groupApi } from "./groupApi/groupApi";
import { rolesApi } from "./rolesApi/rolesApi";
import apiHooks from "./hook";

// total reduces
export const reducerApi = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [groupApi.reducerPath]: groupApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
};

// total hooks api
export { apiHooks };

// total  API slices
export const apiSlices = { authApi, userApi, groupApi, rolesApi };
