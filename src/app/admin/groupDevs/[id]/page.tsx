"use client";

import { GetGroupDetail } from "@/services/groupDev.services/groupDev.services";
import { GroupDev } from "@/services/groupDev.services/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

const DetailGroup = () => {
  const params = useParams();
  const groupId = params.id;
  const [loading, setLoading] = useState(true);
  const [detailGroup, setDetailGroup] = useState<GroupDev>();

  useEffect(() => {
    const fetchDetailUser = async () => {
      setLoading(true);
      try {
        if (groupId && typeof groupId === "string") {
          const res = await GetGroupDetail(groupId);
          if (res.statusCode === 200) {
            // set state
            setDetailGroup(res.data.groupDev);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailUser();
  }, [groupId]);

  console.log("check data", detailGroup);
  return (
    <>
      <div>iD user = {groupId} </div>
    </>
  );
};

export default DetailGroup;
