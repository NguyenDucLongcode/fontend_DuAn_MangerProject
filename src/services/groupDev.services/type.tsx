import { RawProject } from "../project.services/type";
import { AccountUser } from "../user.servies/type";

export interface GroupDev {
  id: string;
  name: string;
  description: string | null;
  visibility: string;
  maxMembers: number;
  avatar_url: string | null;
  createdAt: string;
}

export interface GroupDevDetail {
  id: string;
  name: string;
  description: string | null;
  visibility: string;
  maxMembers: number;
  avatar_url: string | null;
  currentMembers: number;
  leader: {
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
  };
  createdAt: string;
}

export interface GroupDevDetailResponse {
  statusCode: number;
  data: {
    message: string;
    groupDev: GroupDevDetail;
  };
  timestamp: string;
  path: string;
}

// Pagination
export interface FilterInput {
  limit: number;
  page: number;
  name: string | undefined;
  visibility: string | undefined;
  maxMembers: string | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
}

export interface PaginationResponse {
  statusCode: number;
  data: {
    message: string;
    groupDevs: GroupDev[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
  timestamp: string;
  path: string;
}

// update User
export interface UpdateGroupResponse {
  statusCode: number;
  data?: {
    message: string;
    groupDev: GroupDev;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface UpdateGroupPayload {
  id: string;
  name: string;
  description: string;
  maxMembers: string;
  visibility: string;
  avatar: File | null;
}

// delete User
export interface DeleteGroupResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

// create group dev
export interface CreateGroupResponse {
  statusCode: number;
  data?: {
    message: string;
    user: GroupDev;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface CreateGroupPayload {
  name: string;
  description: string;
  visibility: string;
  maxMembers: string;
  avatar: File | null;
}

// get all project from groupId
export interface GetProjectToGroupResponse {
  statusCode: number;
  data?: {
    message: string;
    projects: RawProject[];
    countProject: number | null;
  };
  message?: string;
  timestamp: string;
  path: string;
}

// get list members
export interface GetListMembersResponse {
  statusCode: number;
  data: {
    message: string;
    members: AccountUser[];
  };
  timestamp: string;
  path: string;
}

// post member join to group
export interface MemberJoinToGroupPayload {
  userId: string;
  groupId: string;
}

export interface MemberJoinToGroupResponse {
  statusCode: number;
  data?: {
    message: string;
  };
  message?: string;
  timestamp: string;
  path: string;
}

// delete member from group

export interface DeleteMemberFromGroupPayload {
  userId: string;
  groupId: string;
}

export interface DeleteMemberFromGroupResponse {
  statusCode: number;
  data?: {
    message: string;
  };
  message?: string;
  timestamp: string;
  path: string;
}

// change leader
export interface ChangeLeaderPayload {
  userId: string;
  groupId: string;
}

export interface ChangeLeaderResponse {
  statusCode: number;
  data?: {
    message: string;
  };
  message?: string;
  timestamp: string;
  path: string;
}

// delete leader from grooup
export interface DeleteLeaderFromGroupResponse {
  statusCode: number;
  data?: {
    message: string;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface AssignLeaderFromGroupPayload {
  userId: string;
  groupId: string;
}

export interface AssignLeaderFromGroupResponse {
  statusCode: number;
  data?: {
    message: string;
  };
  message?: string;
  timestamp: string;
  path: string;
}
