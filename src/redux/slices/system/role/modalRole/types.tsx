export interface MoDalRoleState {
  data: Partial<PaginationRoleData>;
  type: string;
  roleId: number;
  dataUpdateRole: DataUpdate;
}

export interface DataUpdate {
  url: string;
  description: string;
}
