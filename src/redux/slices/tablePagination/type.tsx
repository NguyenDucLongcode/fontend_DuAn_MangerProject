export interface PaginationType {
  pageSize: number;
  currentPage: number;
  filterUser: ListFilter;
  filterRole: ListFilterRole;
  filterProject: ListFilterProject;
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

interface ListFilterProject {
  name: string;
  description: string;
}
