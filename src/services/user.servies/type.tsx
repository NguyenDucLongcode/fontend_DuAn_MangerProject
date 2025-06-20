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

// update User
export interface UpdateUserResponse {
  statusCode: number;
  data?: {
    message: string;
    user: AccountUser;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface UpdateUserPayload {
  id: string;
  name: string;
  phone: string;
  address: string;
  gender: string;
  avatar: File | null;
}

// change role
export interface ChangeRole {
  id: string;
  role: string;
}

export interface ChangeRoleResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

// delete User
export interface DeleteUserResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

// create user
export interface CreateUserResponse {
  statusCode: number;
  data?: {
    message: string;
    user: AccountUser;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface CreateUserPayload {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  avatar: File | null;
}
