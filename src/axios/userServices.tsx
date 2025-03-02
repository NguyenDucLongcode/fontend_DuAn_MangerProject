import axiosClient from "@/components/utilities/axios";

export const fetchUserById = async (userId: number) => {
  try {
    return await axiosClient.get(`api/v1/getUseById?id=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
