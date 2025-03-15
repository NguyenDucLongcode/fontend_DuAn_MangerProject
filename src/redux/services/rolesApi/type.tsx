// get all roles
export interface RolesResponse {
  data: RolesData[];
  errCode: number;
  message: string;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}
interface RolesData {
  id: number;
  url: string;
  description: string;
  createdAt: string;
}
