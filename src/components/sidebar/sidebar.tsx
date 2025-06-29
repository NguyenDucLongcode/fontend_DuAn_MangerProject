"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  BarChart,
  Smile,
  Menu,
  X,
  UserPen,
  FolderLock,
  MessageCircleWarning,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { GetGroupDetail } from "@/services/groupDev.services/groupDev.services";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setInforGroupDev } from "@/lib/redux/slices/groupDev/reducer";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const params = useParams();
  const pathname = usePathname();
  const groupId = params.id as string;
  const [avatar, setAvartar] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailGroup = async () => {
      try {
        if (groupId) {
          const res = await GetGroupDetail(groupId);
          if (res.statusCode === 200) {
            setAvartar(res.data.groupDev.avatar_url);

            //dispatch action
            dispatch(setInforGroupDev(res.data.groupDev));
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchDetailGroup();
  }, [groupId, dispatch]);

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Trang chủ",
      href: `/admin/groupDevs/${groupId}/dashboard`,
    },
    {
      icon: <UserPen size={20} />,
      label: "Thành viên",
      href: `/admin/groupDevs/${groupId}/member`,
    },
    {
      icon: <FolderLock size={20} />,
      label: "Dự án",
      href: `/admin/groupDevs/${groupId}/project`,
    },
    {
      icon: <MessageCircleWarning size={20} />,
      label: "Tin nhắn",
      href: `/admin/groupDevs/${groupId}/message`,
    },
    {
      icon: <BarChart size={20} />,
      label: "Nhiệm vụ",
      href: `/admin/groupDevs/${groupId}/assignments`,
    },
    {
      icon: <Smile size={20} />,
      label: "Phản ánh",
      href: `/admin/groupDevs/${groupId}/reflect`,
    },
  ];

  return (
    <motion.div
      animate={{ width: open ? 250 : 70 }}
      className="h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col p-3 overflow-hidden transition-all duration-300"
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-4 text-gray-500 hover:text-blue-500 transition self-start"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo/avatar */}
      <div className="mb-6 flex justify-center items-center">
        <div
          className={`rounded-full overflow-hidden border border-gray-300 shadow-sm transition-all duration-700 bg-white ${
            open ? "w-20 h-20" : "w-10 h-10"
          }`}
        >
          <Image
            src={avatar ? avatar : "/avatar/avatar.png"}
            alt="Logo"
            width={open ? 80 : 40}
            height={open ? 80 : 40}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link href={item.href} key={idx}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                <div className="w-5 min-w-[20px] flex justify-center">
                  {item.icon}
                </div>
                {open && (
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.label}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {open && (
        <div className="mt-auto border-t pt-2">
          <p className="text-sm text-gray-400 whitespace-nowrap">
            Main Channels
          </p>
          <div className="mt-1 text-gray-600 text-sm pl-2">General</div>
        </div>
      )}
    </motion.div>
  );
}
