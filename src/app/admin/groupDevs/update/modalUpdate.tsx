"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalGroup } from "@/lib/redux/slices/modal/action";
import { RootState } from "@/lib/redux/store";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormUpdateGroup from "./formUpdate";
import { PatchUpdateGroupDev } from "@/services/groupDev.services/groupDev.services";

type Props = {
  onRefresh: () => void;
};

export default function ModalUpdateGroupDev({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isUpdateGroup
  );
  const { inforGroup } = useSelector((state: RootState) => state.groupDev);

  const [dataUpdateGroupDev, setDataUpdateGroupDev] = useState({
    id: "",
    name: "",
    description: "",
    visibility: "",
    maxMembers: "",
    avatar: null as File | null,
  });

  // handler
  const CloseModal = () => {
    dispatch(setShowModalGroup.groupUpdate(false));
  };

  const handleSubmit = async () => {
    const { name, description, visibility, maxMembers, avatar } =
      dataUpdateGroupDev;

    // Validate
    if (!name.trim()) {
      return toast.error("Họ tên không được để trống");
    }

    if (Number(maxMembers) <= 0) {
      return toast.error("Số thành viên trong nhóm ít nhất là 1");
    }

    // Kiểm tra thay đổi
    const isInfoChanged =
      inforGroup?.name !== name ||
      inforGroup?.maxMembers !== Number(maxMembers) ||
      inforGroup?.description !== description ||
      inforGroup?.visibility !== visibility ||
      !!avatar;

    // Gọi API cập nhật thông tin
    if (isInfoChanged) {
      try {
        const res = await PatchUpdateGroupDev(dataUpdateGroupDev);
        if (res.statusCode === 200) {
          toast.success("Sửa thông tin thành công");
          onRefresh();
          CloseModal();
        } else {
          const msg =
            res.data?.message || res.message || "Sửa thông tin thất bại";
          toast.error(msg);
        }
      } catch (err) {
        console.error("Lỗi cập nhật:", err);
        toast.error("Đã xảy ra lỗi khi cập nhật thông tin");
      }
    }
  };

  // useEffect
  useEffect(() => {
    if (inforGroup) {
      setDataUpdateGroupDev({
        id: inforGroup.id || "",
        name: inforGroup.name || "",
        description: inforGroup.description || "",
        visibility: inforGroup.visibility || "",
        maxMembers: String(inforGroup.maxMembers) || "",
        avatar: null,
      });
    }
  }, [inforGroup]);

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
                <FormUpdateGroup
                  dataUpdateGroup={dataUpdateGroupDev}
                  setDataUpdateGroupDev={setDataUpdateGroupDev}
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
