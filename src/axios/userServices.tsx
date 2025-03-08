import axiosClient from "@/components/utilities/axios";

export const fetchUserById = async (userId: number) => {
  try {
    return await axiosClient.get(`api/v1/getUseById?id=${userId}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserAccountCookies = async () => {
  try {
    return await axiosClient.get("api/v1/userAccount");
  } catch (error) {
    console.log(error);
  }
};
