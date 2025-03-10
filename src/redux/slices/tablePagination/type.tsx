export interface PaginationType {
  pageSize: number;
  currentPage: number;
  filterUser: ListFilter;
}

interface ListFilter {
  name: string;
  email: string;
  group: string;
}
