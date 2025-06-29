"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GetGroupDetail,
  GetProjectFromGroupId,
} from "@/services/groupDev.services/groupDev.services";
import { InforGroup } from "@/lib/redux/slices/groupDev/type";
import { CardFlip } from "@/components/ui/CardFlip/CardFlip";
import { RawProject } from "@/services/project.services/type";
import UserDetailAvatar from "@/components/avatar/user/detailUser";

export default function MainContent() {
  const params = useParams();
  const groupId = params.id;
  const [detailGroup, setDetailGroup] = useState<InforGroup>();
  const [detailProjects, setDetailProjects] = useState<RawProject[]>();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [showDetailLeader, setShowDetailLeader] = useState(false);

  useEffect(() => {
    const fetchDetailUser = async () => {
      try {
        if (groupId && typeof groupId === "string") {
          const res = await GetGroupDetail(groupId);
          if (res.statusCode === 200) {
            setDetailGroup(res.data.groupDev);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    const fetchCountProjects = async () => {
      try {
        if (groupId && typeof groupId === "string") {
          const res = await GetProjectFromGroupId(groupId);
          if (res.statusCode === 200) {
            setDetailProjects(res.data?.projects);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchDetailUser();
    fetchCountProjects();
  }, [groupId]);

  // hander
  const handleShowDetailLeader = () => {
    if (detailGroup?.leader?.id) {
      setShowDetailLeader(false);
    }
  };

  return (
    <>
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-11/12 max-w-6xl h-[200px] md:h-[260px] mx-auto mt-5 p-2 bg-white rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-900 dark:text-white"
      >
        <Image
          src="/groupDev/bg_groupDev.png"
          alt="background_groupDev"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-2xl"
        />
        <h2 className="absolute bottom-4 left-4 text-sm sm:text-lg md:text-2xl font-semibold text-blue-600 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-lg">
          Welcome to the class!
        </h2>
      </motion.div>

      {/* Group Name */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-11/12 max-w-6xl mt-6 mb-2 text-base sm:text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-100"
      >
        Group: {`"${detailGroup?.name}"`}
      </motion.h2>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-11/12 max-w-6xl mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300"
      >
        <p
          className={`${
            showFullDescription ? "" : "line-clamp-3"
          } transition-all duration-300`}
        >
          Mô tả: {detailGroup?.description}
        </p>
        {detailGroup?.description && detailGroup.description.length > 100 && (
          <button
            className="text-blue-600 hover:underline focus:outline-none text-sm"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </motion.div>

      {/* Grid Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-11/12 max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <CardFlip
          title={`Trưởng nhóm:  ${detailGroup?.leader?.id ? "1" : "0"}/1`}
          description="Thông tin về trưởng nhóm và quyền quản lý nhóm."
          imageSrc="/avatar/avatar.png"
          onClick={() => setShowDetailLeader(true)}
        />

        <CardFlip
          title={`Thành viên:  ${detailGroup?.currentMembers}/${detailGroup?.maxMembers}`}
          description="Quản lý số lượng và vai trò của các thành viên trong nhóm."
          imageSrc="/avatar/avatar.png"
        />

        <CardFlip
          title={`Dự án:  ${detailProjects?.length}`}
          description="Xem và quản lý các dự án mà nhóm đang tham gia."
          imageSrc="/avatar/avatar.png"
        />

        <CardFlip
          title={`Tin nhắn`}
          description="Theo dõi và quản lý các cuộc trò chuyện trong nhóm."
          imageSrc="/avatar/avatar.png"
        />
      </motion.div>

      {showDetailLeader && (
        <UserDetailAvatar
          onClose={() => handleShowDetailLeader()}
          userId={detailGroup?.leader?.id || ""}
        />
      )}
    </>
  );
}
