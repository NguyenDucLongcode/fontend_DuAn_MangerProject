import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MoDalState = {
  data: {},
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
  formFields: [
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
};

const modalUserSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{ data: User | object; type: string }>
    ) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
    },
    hide: (state) => {
      state.data = {};
      state.type = "";
    },
    togglePassword: (state) => {
      state.showPassword = !state.showPassword;
    },

    createUser: (state, action: PayloadAction<Partial<CreateUserType>>) => {
      state.dataCreateUser = { ...state.dataCreateUser, ...action.payload };
    },
  },
});

export const { show, hide, createUser, togglePassword } =
  modalUserSlice.actions;
export default modalUserSlice.reducer;
