"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalUser } from "@/lib/redux/slices/modal/action";
import { RootState } from "@/lib/redux/store";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormUpdateUser from "./formUpdate";
import { toast } from "react-toastify";
import {
  PatchChangeRole,
  PatchUpdateUser,
} from "@/services/user.servies/user.services";

type Props = {
  onRefresh: () => void;
};

export default function ModalUpdateUser({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isUpdateUser
  );
  const { inforUser } = useSelector((state: RootState) => state.user);

  const [dataUpdateUser, setDataUpdateuser] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
    avatar: null as File | null,
  });

  // handler
  const CloseModal = () => {
    dispatch(setShowModalUser.userUpdate(false));
  };

  const handleSubmit = async () => {
    const { name, phone, address, gender, avatar, role } = dataUpdateUser;

    // Validate
    if (!name.trim()) {
      return toast.error("Họ tên không được để trống");
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error("Số điện thoại phải từ 10 đến 11 chữ số");
    }

    const validGenders = ["Nam", "Nữ"];
    if (!validGenders.includes(gender)) {
      return toast.error("Giới tính phải là Nam hoặc Nữ");
    }

    // Kiểm tra thay đổi
    const isInfoChanged =
      inforUser?.name !== name ||
      inforUser?.phone !== phone ||
      inforUser?.address !== address ||
      inforUser?.gender !== gender ||
      !!avatar;

    const isRoleChanged = inforUser?.role !== role;

    let success = false;

    // Gọi API cập nhật thông tin
    if (isInfoChanged) {
      try {
        const res = await PatchUpdateUser(dataUpdateUser);
        if (res.statusCode === 200) {
          toast.success("Sửa thông tin thành công");
          success = true;
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

    // Gọi API đổi quyền
    if (isRoleChanged) {
      try {
        const res = await PatchChangeRole(dataUpdateUser);
        if (res.statusCode === 200) {
          toast.success("Nâng quyền thành công");
          success = true;
        } else {
          toast.error(res.message || "Nâng quyền thất bại");
        }
      } catch (err) {
        console.error("Lỗi nâng quyền:", err);
        toast.error("Đã xảy ra lỗi khi nâng quyền");
      }
    }

    if (success) {
      onRefresh();
      CloseModal();
    }
  };

  // useEffect
  useEffect(() => {
    if (inforUser) {
      setDataUpdateuser({
        id: inforUser.id || "",
        name: inforUser.name || "",
        phone: inforUser.phone || "",
        address: inforUser.address || "",
        gender: inforUser.gender || "",
        role: inforUser.role || "",
        avatar: null,
      });
    }
  }, [inforUser]);

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
                <FormUpdateUser
                  dataUpdateUser={dataUpdateUser}
                  setDataUpdateuser={setDataUpdateuser}
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
