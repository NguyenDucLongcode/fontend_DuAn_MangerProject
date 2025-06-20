export interface UserState {
  inforUser: InforUser | null;
}

export interface InforUser {
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
