import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowAvatarDetail } from "@/lib/redux/slices/modal/action";

export default function UserDetailAvatar() {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isShowModalAvatar
  );
  const { inforUser } = useSelector((state: RootState) => state.user);

  const CloseModal = () => {
    dispatch(setShowAvatarDetail.DetailAvatar(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden relative py-4"
          >
            <div className="relative w-full h-32">
              <Image
                src="/groupDev/bg_groupDev.png"
                alt="cover"
                fill
                className="object-cover"
                priority
              />
            </div>

            <button
              type="button"
              onClick={CloseModal}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
            >
              ✕
            </button>

            <div className="p-4 -mt-8">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20">
                  <Image
                    src={
                      inforUser?.avatar_url
                        ? inforUser.avatar_url
                        : "/avatar/avatar.png"
                    }
                    alt="avatar"
                    fill
                    className="rounded-full border-2 object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mt-5">
                    {inforUser?.name}
                  </h2>
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
                  <span className="text-black">{inforUser?.gender}</span>
                </p>
                <p>
                  Địa chỉ:{" "}
                  <span className="text-black">{inforUser?.address}</span>
                </p>
                <p>
                  Số điện thoại:{" "}
                  <span className="text-black">{inforUser?.phone}</span>
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-600 border-t pt-2 space-y-2">
                <p>📇 Chia sẻ danh thiếp</p>
                <p>🚫 Chặn tin nhắn và cuộc gọi</p>
                <p>⚠️ Báo xấu</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
