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

// Pagination
export interface PaginationResponse {
  currentPage: number;
  data: PaginationUserData[];
  errCode: number;
  message: string;
  totalPages: number;
  totalRecords: number;
}
