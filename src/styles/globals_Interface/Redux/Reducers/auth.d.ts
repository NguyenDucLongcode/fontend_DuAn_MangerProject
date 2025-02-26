declare global {
  // account off user
  interface AccountStyle {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    sex: string | null;
    isCustomer: string | null;
    groupId: number;
    createdAt: string;
  }
  interface AccountState {
    account: Partial<AccountStyle>; // Cho phép các trường thiếu, nhưng vẫn là object
    isAuthenticated: boolean;
  }

  // login
  interface LoginFormFields {
    email: string;
    password: string;
  }

  interface InputField {
    label: string;
    type: string;
    name: keyof LoginFormFields;
    id: string;
    placeholder: string;
  }
}

export {};
