// get User By Id
export interface GetUserByIdRequest {
  errCode: number;
  data: DataUserById;
  message: string;
}

export interface DataUserById {
  name: string;
  email: string;
  phone: string;
  sex: string;
  address: string;
  isCustomer: string;
  groupId: number;
  createdAt: string;
  dataGroup: {
    name: string;
  };
}
// get all group
export interface GroupResponse {
  data: Group[];
  errCode: number;
  message: string;
}
export interface Group {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
// Pagination
export interface PaginationResponse {
  currentPage: number;
  data: PaginationData[];
  errCode: number;
  message: string;
  totalPages: number;
  totalRecords: number;
}
export interface PaginationData {
  address: string | null;
  createdAt: string | null;
  dataGroup: {
    name: string;
  };
  email: string;
  groupId: number;
  id: number;
  isCustomer: string;
  name: string | null;
  phone: string | null;
  sex: string | null;
}
