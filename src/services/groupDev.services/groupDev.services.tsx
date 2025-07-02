import axiosInstance from "@/lib/axios/axios.ts"; // CHÍNH XÁC
import { isAxiosError } from "axios";
import {
  AssignLeaderFromGroupPayload,
  AssignLeaderFromGroupResponse,
  ChangeLeaderPayload,
  ChangeLeaderResponse,
  DeleteLeaderFromGroupResponse,
  DeleteMemberFromGroupPayload,
} from "./type";
import {
  CreateGroupPayload,
  CreateGroupResponse,
  DeleteGroupResponse,
  DeleteMemberFromGroupResponse,
  FilterInput,
  GetListMembersResponse,
  GetProjectToGroupResponse,
  GroupDevDetailResponse,
  MemberJoinToGroupPayload,
  MemberJoinToGroupResponse,
  PaginationResponse,
  UpdateGroupPayload,
  UpdateGroupResponse,
} from "./type";

export const GetGroupDetail = async (
  groupId: string
): Promise<GroupDevDetailResponse> => {
  try {
    const res = await axiosInstance.get(`/group-dev?id=${groupId}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get group Dev detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const GetListMembers = async (
  groupId: string
): Promise<GetListMembersResponse> => {
  try {
    const res = await axiosInstance.get(
      `/group-member/list?groupId=${groupId}`
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get list member in group failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const GetGroupDevPagination = async (
  payloadFilter: FilterInput
): Promise<PaginationResponse> => {
  const { limit, page, name, visibility, maxMembers, fromDate, toDate } =
    payloadFilter;

  const queryParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    name: name || "",
    visibility: visibility || "",
    maxMembers: maxMembers || "",
    fromDate: fromDate || "",
    toDate: toDate || "",
  }).toString();

  try {
    const res = await axiosInstance.get(`/group-dev/pagination?${queryParams}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get group dev detail failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PostCreateGroup = async (
  dataUpdateGroup: CreateGroupPayload
): Promise<CreateGroupResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateGroup.name);
    formData.append("description", dataUpdateGroup.description);
    formData.append("visibility", dataUpdateGroup.visibility);
    formData.append("maxMembers", dataUpdateGroup.maxMembers);
    if (dataUpdateGroup.avatar) {
      formData.append("file", dataUpdateGroup.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.post(`/group-dev/create`, formData);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Create group failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchUpdateGroupDev = async (
  dataUpdateGroup: UpdateGroupPayload
): Promise<UpdateGroupResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", dataUpdateGroup.name);
    formData.append("description", dataUpdateGroup.description);
    formData.append("visibility", dataUpdateGroup.visibility);
    formData.append("maxMembers", dataUpdateGroup.maxMembers);
    if (dataUpdateGroup.avatar) {
      formData.append("file", dataUpdateGroup.avatar); // key là `file` như Postman
    }

    const res = await axiosInstance.patch(
      `/group-dev/update?id=${dataUpdateGroup.id}`,
      formData
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Update group dev failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteGroupDev = async (
  groupId: string
): Promise<DeleteGroupResponse> => {
  try {
    const res = await axiosInstance.delete(`/group-dev/delete?id=${groupId}`);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Delete group failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const GetProjectFromGroupId = async (
  groupId: string
): Promise<GetProjectToGroupResponse> => {
  try {
    const res = await axiosInstance.get(
      `/group-dev/findProject_GroupId?id=${groupId}`
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Get project to group failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PostJoinMember = async (
  dataMemberJoinToGroup: MemberJoinToGroupPayload
): Promise<MemberJoinToGroupResponse> => {
  try {
    const res = await axiosInstance.post(
      `/group-member/join`,
      dataMemberJoinToGroup
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Join member to group failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteMemberFromGroup = async (
  payload: DeleteMemberFromGroupPayload
): Promise<DeleteMemberFromGroupResponse> => {
  try {
    const res = await axiosInstance.delete(
      `/group-member/leave?groupId=${payload.groupId}&userId=${payload.userId}`
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Delete member from group failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PatchChangeLeader = async (
  payload: ChangeLeaderPayload
): Promise<ChangeLeaderResponse> => {
  try {
    const res = await axiosInstance.patch(
      `/group-leader/change?groupId=${payload.groupId}`,
      { userId: payload.userId }
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(err.response?.data?.message || "Update group dev failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const DeleteLeaderFromGroup = async (
  groupId: string
): Promise<DeleteLeaderFromGroupResponse> => {
  try {
    const res = await axiosInstance.delete(
      `group-leader/remove?groupId=${groupId}`
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Delete leader from group failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const PostAssignLeaderFromGroup = async (
  dataAssignLeaderFromGroup: AssignLeaderFromGroupPayload
): Promise<AssignLeaderFromGroupResponse> => {
  try {
    const res = await axiosInstance.post(
      `/group-leader/assign`,
      dataAssignLeaderFromGroup
    );

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("API error response", err.response);
      throw new Error(
        err.response?.data?.message || "Join member to group failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
