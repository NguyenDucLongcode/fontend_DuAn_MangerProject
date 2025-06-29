export interface ProjectState {
  inforProject: InforProject | null;
}

export interface InforProject {
  id: string;
  groupId: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  createdAt: string;
}
