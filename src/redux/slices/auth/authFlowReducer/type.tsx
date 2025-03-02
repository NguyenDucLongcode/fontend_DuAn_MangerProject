// authFlowReducer

export interface AuthFlowState {
  inputLoginField: InputLoginField[];
  inputRegisterField: InputRegisterField[];
  dataSubmitLogin: DataSubmitLogin;
  dataSubmitRegister: DataSubmitRegister;
  showPassword: boolean;
}

// loginReducer
export interface DataSubmitLogin {
  email: string;
  password: string;
}

export interface InputLoginField {
  label: string;
  type: string;
  name: keyof DataSubmitLogin;
  id: string;
  placeholder: string;
}
// register

export interface DataSubmitRegister {
  email: string;
  password: string;
  phone: string;
  userName: string;
}
export interface InputRegisterField {
  label: string;
  type: string;
  name: keyof DataSubmitRegister;
  id: string;
  placeholder: string;
}
