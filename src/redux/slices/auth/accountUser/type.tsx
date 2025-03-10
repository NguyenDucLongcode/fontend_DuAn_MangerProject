export interface AccountStyle {
  access_token: string;
  data: { id: number; name: string; roles: RolesStyle[] };
  email: string;
}

export interface RolesStyle {
  id: number;
  url: string;
  description: string;
  createdAt: string;
}
export interface AccountState {
  account: AccountStyle | null; // Cho phép các trường thiếu, nhưng vẫn là object
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
