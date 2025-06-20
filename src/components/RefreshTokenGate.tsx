"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { login } from "@/lib/redux/slices/auth/reducer";
import { refresh_token } from "@/services/auth.services/auth.services";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingPage from "./loading/Loading";
import { findUserFromToken } from "@/utils/token/decodeTokenFindUser";

export default function RefreshTokenGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (pathname === "/login") {
        setIsReady(true);
        return;
      }

      try {
        const res = await refresh_token();
        if (res.statusCode === 200) {
          const { access_token } = res.data;
          const dataUser = await findUserFromToken(access_token);
          dispatch(login({ access_token, user: dataUser }));
        }
      } catch (err) {
        console.log("Không thể refresh token", err);
      } finally {
        setIsReady(true); // luôn cho phép render sau khi cố refresh
      }
    };

    init();
  }, [pathname, dispatch]);

  if (!isReady) return <LoadingPage />;

  return <>{children}</>;
}
