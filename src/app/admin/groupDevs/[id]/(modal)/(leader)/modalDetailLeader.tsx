"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setDetailGroupId } from "@/lib/redux/slices/modal/action";
import { RootState } from "@/lib/redux/store";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormDetailLeader from "./formListLeader";
import {
  PatchChangeLeader,
  PostAssignLeaderFromGroup,
} from "@/services/groupDev.services/groupDev.services";

type Props = {
  onRefresh: () => void;
};

export default function ModalDetaiLeader({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isShowLeaderFromGroup
  );

  const inforGroup = useSelector(
    (state: RootState) => state.groupDev.inforGroup
  );

  const [selectionLeader, setSelectionLeader] = useState<string>("");

  // handler
  const CloseModal = () => {
    dispatch(setDetailGroupId.detailLeader(false));
    setSelectionLeader("");
  };

  const handleSubmit = async () => {
    if (!selectionLeader.trim()) {
      return toast.error("Người dùng không được để trống");
    }

    if (!inforGroup?.id) {
      return toast.error("Nhóm không được để trống");
    }

    const isAssign = !inforGroup.leader?.id;

    try {
      let res;

      if (isAssign) {
        res = await PostAssignLeaderFromGroup({
          userId: selectionLeader,
          groupId: inforGroup.id,
        });
      } else {
        res = await PatchChangeLeader({
          userId: selectionLeader,
          groupId: inforGroup.id,
        });
      }

      if (res.statusCode === 200) {
        if (isAssign) {
          toast.success("Thêm trưởng nhóm thành công");
        } else {
          toast.success("Thay đổi trưởng nhóm thành công");
        }
        onRefresh();
        CloseModal();
      } else {
        const msg =
          res.data?.message ||
          res.message ||
          (isAssign
            ? "Thêm trưởng nhóm thất bại"
            : "Thay đổi trưởng nhóm thất bại");
        toast.error(msg);
      }
    } catch (err) {
      console.error(
        isAssign
          ? "Lỗi khi thêm trưởng nhóm:"
          : "Lỗi khi thay đổi trưởng nhóm:",
        err
      );
      if (isAssign) {
        toast.error("Đã xảy ra lỗi khi thêm trưởng nhóm");
      } else {
        toast.error("Đã xảy ra lỗi khi thay đổi trưởng nhóm");
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
                <FormDetailLeader
                  setSelectionLeader={setSelectionLeader}
                  onRefresh={onRefresh}
                />

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleSubmit}
                  >
                    Lưu thay đổi
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
