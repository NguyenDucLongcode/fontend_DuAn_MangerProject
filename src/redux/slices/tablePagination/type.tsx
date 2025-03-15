export interface PaginationType {
  pageSize: number;
  currentPage: number;
  filterUser: ListFilter;
  filterRole: ListFilterRole;
}

interface ListFilter {
  name: string;
  email: string;
  groupId: number | string;
}

interface ListFilterRole {
  url: string;
  description: string;
}
