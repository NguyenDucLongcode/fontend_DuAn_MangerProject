export interface GroupState {
  inforGroup: InforGroup | null;
}

export interface InforGroup {
  id: string;
  name: string;
  description: string | null;
  visibility: string;
  maxMembers: number;
  avatar_url: string | null;
  currentMembers?: number;
  leader?: {
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
  };
  createdAt: string;
}
