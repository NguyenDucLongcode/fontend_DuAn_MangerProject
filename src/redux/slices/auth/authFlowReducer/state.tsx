import { AuthFlowState } from "./type";

export const initialState: AuthFlowState = {
  inputLoginField: [
    {
      label: "Email",
      type: "email",
      name: "email",
      id: "emailLogin",
      placeholder: "Enter your email",
    },
  ],
  inputRegisterField: [
    {
      label: "Username",
      type: "text",
      name: "userName",
      id: "nameRegister",
      placeholder: "Enter your username",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      id: "emailRegister",
      placeholder: "Enter your email",
    },
    {
      label: "Phone",
      type: "number",
      name: "phone",
      id: "phoneRegister",
      placeholder: "Enter your phone",
    },
  ],
  dataSubmitLogin: {
    email: "",
    password: "",
  },

  dataSubmitRegister: {
    email: "",
    password: "",
    phone: "",
    userName: "",
  },
  showPassword: false,
};
