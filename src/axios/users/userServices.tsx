import axiosClient from "@/components/utilities/axios";

export const fetchUserById = async (userId: number) => {
  try {
    return await axiosClient.get(`api/v1/user/getUseById?id=${userId}`);
  } catch (error) {
    console.log(error);
  }
};
export const getPagination = async (page: number, limit: number) => {
  const res = await axiosClient.get(
    `api/v1/user/read?page=${page}&limit=${limit}`
  );
  return res.data;
};
