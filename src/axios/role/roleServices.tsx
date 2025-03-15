import axiosClient from "@/components/utilities/axios";

export const fetchRoleById = async (userId: number) => {
  try {
    return await axiosClient.get(`/api/v1/getRoleById?id=${userId}`);
  } catch (error) {
    console.log(error);
  }
};
