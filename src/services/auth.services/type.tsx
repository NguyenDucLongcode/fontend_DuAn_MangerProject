export interface PayloadLogin {
  username: string;
  password: string;
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

export interface LoginResponse {
  statusCode: number;
  data: {
    message: string;
    access_token: string;
  };
  timestamp: string;
  path: string;
}

export interface ReloadPageResponse {
  statusCode: number;
  data: {
    message: string;
    access_token: string;
    user: AccountUser;
  };
  timestamp: string;
  path: string;
}
