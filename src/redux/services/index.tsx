import { authApi } from "./authApi";
import { userApi } from "./userApi";
import apiHooks from "./hook";

// total reduces
export const reducerApi = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};

// total hooks api
export { apiHooks };

// total  API slices
export const apiSlices = { authApi, userApi };
