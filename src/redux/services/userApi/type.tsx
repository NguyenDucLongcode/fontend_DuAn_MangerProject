// Pagination
export interface PaginationResponse {
  currentPage: number;
  data: PaginationUserData[];
  errCode: number;
  message: string;
  totalPages: number;
  totalRecords: number;
}
