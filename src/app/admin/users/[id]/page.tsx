"use client";

import { AccountUser } from "@/services/auth.services/type";
import { GetUserDetail } from "@/services/user.servies/user.services";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

const DetailUser = () => {
  const params = useParams();
  const userId = params.id;
  const [loading, setLoading] = useState(true);
  const [detailUser, setDetailUser] = useState<AccountUser>();

  useEffect(() => {
    const fetchDetailUser = async () => {
      setLoading(true);
      try {
        if (userId && typeof userId === "string") {
          const res = await GetUserDetail(userId);
          if (res.statusCode === 200) {
            // set state
            setDetailUser(res.data.user);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailUser();
  }, [userId]);

  console.log("check id", detailUser);
  return (
    <div>
      <div>iD user = {userId} </div>
    </div>
  );
};

export default DetailUser;
