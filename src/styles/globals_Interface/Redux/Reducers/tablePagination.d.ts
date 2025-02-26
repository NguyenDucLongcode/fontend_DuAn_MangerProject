declare global {
  interface PaginationType {
    pageSize: number;
    currentPage: number;
    filterText: string;
    gotoPage: number;
  }
}

export {};
