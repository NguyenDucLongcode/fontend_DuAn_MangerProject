export interface AccountStyle {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  sex: string | null;
  isCustomer: string | null;
  groupId: number;
  createdAt: string;
}
export interface AccountState {
  account: Partial<AccountStyle>; // Cho phép các trường thiếu, nhưng vẫn là object
  isAuthenticated: boolean;
}
