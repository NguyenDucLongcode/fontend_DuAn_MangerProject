export interface AccountUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  gender: string | null;
  role: string | null;
  isActive: boolean;
  avatar_url: string | null;
  createdAt: string;
}

export interface UserDetailResponse {
  statusCode: number;
  data: {
    message: string;
    user: AccountUser;
  };
  timestamp: string;
  path: string;
}

// Pagination
export interface AccountUserPagination {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  gender: string | null;
  role: string | null;
  isActive: boolean;
  avatar_url: string | null;
  createdAt: string;
}

export interface FilterInput {
  limit: number;
  page: number;
  name: string | undefined;
  email: string | undefined;
  role: string | undefined;
  isActive: boolean;
  fromDate: string | undefined;
  toDate: string | undefined;
}

export interface PaginationResponse {
  statusCode: number;
  data: {
    message: string;
    users: AccountUserPagination[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
  timestamp: string;
  path: string;
}
