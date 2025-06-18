export interface AuthState {
  accountUser: AccountUser | null;
  access_token: string;
}

export interface AccountUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  gender: string | null;
  role: string | null;
  isActive: boolean;
  avatar_url: string | null;
  createdAt: string;
}

export interface LoginPayload {
  user: AccountUser | null;
  access_token: string;
}
