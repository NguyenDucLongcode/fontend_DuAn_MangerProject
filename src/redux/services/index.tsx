import { authApi } from "./authApi";
import apiHooks from "./hook";

// total reduces
export const reducerApi = {
  [authApi.reducerPath]: authApi.reducer,
};

// total hooks api
export { apiHooks };

// total  API slices
export const apiSlices = { authApi };
