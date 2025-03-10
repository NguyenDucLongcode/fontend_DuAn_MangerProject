import * as userServices from "./users/userServices";
import * as authServices from "./auth/auth";

export const apiAxios = {
  user: userServices,
  auth: authServices,
};
