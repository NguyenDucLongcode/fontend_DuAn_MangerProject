import { MoDalUserState } from "./types";

export const initialState: MoDalUserState = {
  data: {},
  userId: 0,
  type: "",
  showPassword: false,
  dataCreateUser: {
    email: "",
    password: "",
    userName: "",
    phone: "",
    address: "",
    sex: "",
    groupId: "",
  },

  formFieldsCreate: [
    [
      {
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        name: "email",
      },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        name: "password",
      },
    ],
    [
      {
        label: "UserName",
        type: "text",
        placeholder: "Enter your userName",
        name: "userName",
      },
      {
        label: "Phone",
        type: "number",
        placeholder: "Enter your phone",
        name: "phone",
      },
    ],
    [
      {
        label: "Address",
        type: "text",
        placeholder: "Enter your address",
        name: "address",
      },
    ],
  ],
  formFieldsUpdate: [
    [
      {
        label: "UserName",
        type: "text",
        placeholder: "Enter your userName",
        name: "name",
      },
      {
        label: "Phone",
        type: "number",
        placeholder: "Enter your phone",
        name: "phone",
      },
    ],
    [
      {
        label: "Address",
        type: "text",
        placeholder: "Enter your address",
        name: "address",
      },
    ],
  ],

  dataUpdateUser: {
    id: null,
    name: "",
    phone: "",
    address: "",
    isCustomer: "",
    sex: "",
    groupId: null,
  },
};
