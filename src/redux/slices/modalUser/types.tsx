import { PaginationData } from "@/redux/services/userApi/type";

export interface MoDalUserState {
  data: Partial<PaginationData>;
  type: string;
  userId: number;
  dataCreateUser: DataSubmitCreateUser;
  formFieldsCreate: Array<Array<FormFieldType>>;
  formFieldsUpdate: Array<Array<FormFieldType>>;
  showPassword: boolean;
  dataUpdateUser: DataSubmitUpdateUser;
}
// identifier user
export interface IdentityUser {
  No: number;
  email: string;
  userName: string;
  phone: string;
  group: string;
  id: number;
}
// create User
export interface DataSubmitCreateUser {
  email: string;
  password: string;
  userName: string;
  phone: string;
  address: string;
  sex: string;
  groupId: string;
}
export interface FormFieldType {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}
// update User
export interface DataSubmitUpdateUser {
  id: number | null;
  name: string;
  phone: string;
  address: string;
  isCustomer: string;
  sex: string;
  groupId: number | null;
}

export interface UserByIdApiResponse {
  name: string;
  phone: string;
  address: string;
  isCustomer: string;
  sex: string;
  groupId: number | null;
}
