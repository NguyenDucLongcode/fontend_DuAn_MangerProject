import axiosClient from "@/components/utilities/axios";

export const fetchUserAccountCookies = async () => {
  try {
    return await axiosClient.get("api/v1/userAccount");
  } catch (error) {
    console.log(error);
  }
};
