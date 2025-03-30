"use client";

import { useEffect } from "react";
import { apiAxios } from "@/axios";

const REFRESH_TIME = 55 * 60 * 1000; // 55 phút (nếu access token hết hạn sau 1 giờ)

const useAutoRefreshToken = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await apiAxios.auth.refresh_Token();
      } catch (error) {
        console.error("Refresh token failed", error);
      }
    }, REFRESH_TIME);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default useAutoRefreshToken;
