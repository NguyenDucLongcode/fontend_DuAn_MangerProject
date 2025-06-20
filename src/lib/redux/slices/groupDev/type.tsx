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
  createdAt: string;
}
