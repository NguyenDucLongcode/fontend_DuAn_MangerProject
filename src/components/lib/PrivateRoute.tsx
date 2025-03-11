"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// list route project
const PROTECTED_ROUTES = ["/users"];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.authReducerData
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated && PROTECTED_ROUTES.includes(pathname)) {
      router.push("/login"); // Redirect nếu chưa đăng nhập
    }
  }, [isAuthenticated, pathname, router, isLoading]);

  if (isLoading) return null;

  return isAuthenticated || !PROTECTED_ROUTES.includes(pathname) ? (
    <>{children}</>
  ) : null;
};

export default ProtectedRoute;
