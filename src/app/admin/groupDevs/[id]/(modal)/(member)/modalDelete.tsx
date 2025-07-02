"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setDetailGroupId } from "@/lib/redux/slices/modal/action";
import { RootState } from "@/lib/redux/store";
import { DeleteMemberFromGroup } from "@/services/groupDev.services/groupDev.services";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {
  onRefresh: () => void;
};

export default function ModalDeleteMember({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isDeleteMember
  );
  const { inforUser } = useSelector((state: RootState) => state.user);
  const { inforGroup } = useSelector((state: RootState) => state.groupDev);

  // handler
  const CloseModal = () => {
    dispatch(setDetailGroupId.deleteMember(false));
  };

  const handleSubmit = async () => {
    if (inforUser?.id && inforGroup?.id) {
      try {
        const res = await DeleteMemberFromGroup({
          groupId: inforGroup.id,
          userId: inforUser.id,
        });
        if (res.statusCode === 200) {
          toast.success("Xóa người dùng khỏi nhóm thành công");
          onRefresh();
          CloseModal();
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        console.error("Lỗi xóa người dùng:", err);
        toast.error("Đã xảy ra lỗi khi xóa người dùng");
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={CloseModal}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal content wrapper */}
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 animate-border">
              <DialogPanel
                className="w-full max-w-2xl sm:max-h-[90vh] overflow-y-auto
              bg-white dark:bg-[#0f172a] rounded-2xl p-8
              border border-gray-200 dark:border-gray-600 shadow-xl"
              >
                <DialogTitle className="text-2xl font-bold text-cyan-400 mb-1">
                  Xóa người dùng
                </DialogTitle>
                {/* content */}
                <div className="mt-2">
                  <p className="text-m text-gray-500">
                    Bạn có chắn muốn xóa người dùng{inforUser?.name}
                  </p>
                </div>

                {/* button */}
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleSubmit}
                  >
                    Xác Nhận
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                    onClick={CloseModal}
                  >
                    Thoát
                  </button>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
