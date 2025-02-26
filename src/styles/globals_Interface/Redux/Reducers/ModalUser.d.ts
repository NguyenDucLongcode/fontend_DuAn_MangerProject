declare global {
  interface MoDalState {
    data: object;
    type: string;
    dataCreateUser: CreateUserType;
    formFields: Array<Array<FormFieldType>>;
    showPassword: boolean;
  }

  // create User
  interface CreateUserType {
    email: string;
    password: string;
    userName: string;
    phone: string;
    address: string;
    sex: string;
    groupId: string;
  }
  interface FormFieldType {
    label: string;
    type: string;
    placeholder: string;
    name: string;
  }
}

export {};
