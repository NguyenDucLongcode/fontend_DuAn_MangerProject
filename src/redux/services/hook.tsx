import { useLoginMutation, useRegisterMutation } from "./authApi";

const apiHooks = {
  Login: useLoginMutation,
  Register: useRegisterMutation,
};

export default apiHooks;
