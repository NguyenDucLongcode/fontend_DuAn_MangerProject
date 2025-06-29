import { AccountUser } from "@/services/auth.services/type";
import { GetUserDetail } from "@/services/user.servies/user.services";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  userId: string;
};

export default function UserDetailAvatar({ onClose, userId }: Props) {
  const [detailUser, setDetailUser] = useState<AccountUser>();

  useEffect(() => {
    const fetchDetailUser = async () => {
      try {
        if (userId && typeof userId === "string") {
          const res = await GetUserDetail(userId);
          if (res.statusCode === 200) {
            setDetailUser(res.data.user);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchDetailUser();
  }, [userId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden relative py-4">
        <div className="relative w-full h-35 ">
          <Image
            src="/groupDev/bg_groupDev.png"
            alt="cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
        >
          ✕
        </button>

        <div className="p-4 -mt-8">
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 ">
              {/* avatar */}
              <Image
                src={
                  detailUser?.avatar_url
                    ? detailUser.avatar_url
                    : "/avatar/avatar.png"
                }
                alt="avatar"
                fill
                className="rounded-full border-2 object-cover"
              />
            </div>
            <div className="border-t-2 ">
              <h2 className="text-lg font-semibold mt-5">{detailUser?.name}</h2>
              <div className="mt-1 flex gap-2 flex-wrap">
                <button className="bg-gray-200 px-3 py-1 text-sm rounded">
                  Kết bạn
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded">
                  Nhắn tin
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <p>
              Giới tính:{" "}
              <span className="text-black">{detailUser?.gender}</span>
            </p>
            <p>
              Địa chỉ: <span className="text-black">{detailUser?.address}</span>
            </p>
            <p>
              Số điện thoại:{" "}
              <span className="text-black">{detailUser?.phone}</span>
            </p>
          </div>

          <div className="mt-4 text-sm text-gray-600 border-t pt-2 space-y-2">
            <p>📇 Chia sẻ danh thiếp</p>
            <p>🚫 Chặn tin nhắn và cuộc gọi</p>
            <p>⚠️ Báo xấu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
