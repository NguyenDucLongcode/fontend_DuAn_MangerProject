export interface MoDalRoleState {
  data: Partial<PaginationRoleData>;
  type: string;
  roleId: number;
  dataUpdateRole: DataUpdate;
  dataCreateRole: DataCreate;
}

export interface DataUpdate {
  url: string;
  description: string;
}
export interface DataCreate {
  url: string;
  description: string;
}
