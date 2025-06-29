export interface Project {
  id: string;
  groupId: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  group: { name: string; maxMembers: number };
  createdAt: string;
}

export interface RawProject {
  id: string;
  groupId: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  createdAt: string;
}

export interface ProjectDetailResponse {
  statusCode: number;
  data: {
    message: string;
    project: RawProject;
  };
  timestamp: string;
  path: string;
}

// Pagination
export interface FilterInput {
  limit: number;
  page: number;
  groupId: string | undefined;
  name: string | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
}

export interface PaginationResponse {
  statusCode: number;
  data: {
    message: string;
    projects: Project[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
  timestamp: string;
  path: string;
}

// update User
export interface UpdateProjectResponse {
  statusCode: number;
  data?: {
    message: string;
    project: RawProject;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface UpdateProjectPayload {
  id: string;
  name: string;
  description: string;
  groupId: string;
  avatar: File | null;
}

// delete User
export interface ProjectResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

// create group dev
export interface CreateProjectResponse {
  statusCode: number;
  data?: {
    message: string;
    project: RawProject;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  groupId: string;
  avatar: File | null;
}
