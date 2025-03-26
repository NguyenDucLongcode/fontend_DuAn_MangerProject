export interface ProjectPaginationResponse {
  data: ProjectData[];
  errCode: number;
  message: string;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}
interface ProjectData {
  id: number;
  name: string;
  startDate: string;
  description: string;
  projectManagerId: number;
  customerId: number;
  createdAt: string;
}
