import axiosClient from "@/components/utilities/axios";

export const fetchUserAccountCookies = async () => {
  try {
    return await axiosClient.get("api/v1/userAccount");
  } catch (error) {
    console.log(error);
  }
};

export const refresh_Token = async () => {
  try {
    return await axiosClient.post("api/v1/refresh-token");
  } catch (error) {
    console.log(error);
    console.error("Lỗi refresh token:", error);
    throw error;
  }
};
