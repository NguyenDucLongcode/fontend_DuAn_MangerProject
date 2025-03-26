export interface DataAllRolesWithIdGroup {
  groupId: number | null;
  dataAllRolesWithIdGroup: RoleType[];
}

export interface RoleType {
  id: number;
  url: string;
  description: string;
  createdAt: string;
}
