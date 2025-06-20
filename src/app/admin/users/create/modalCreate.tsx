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
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import FormCreateUser from "./formCreate";
import { toast } from "react-toastify";
import { isValidEmail, validatePassword } from "@/utils/validateInput";
import { PotCreateUser } from "@/services/user.servies/user.services";

type Props = {
  onRefresh: () => void;
};

const initStateCreateUser = {
  name: "",
  password: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  role: "",
  avatar: null as File | null,
};

export default function ModalCreateUser({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isCreateUser
  );

  const [dataCreateUser, setDataCreateUser] = useState(initStateCreateUser);

  // handler
  const CloseModal = () => {
    dispatch(setShowModalUser.userCreate(false));
    setDataCreateUser(initStateCreateUser);
  };

  const handleSubmit = async () => {
    const { name, phone, gender, password, email } = dataCreateUser;

    if (!isValidEmail(email)) {
      return toast.error("Vui lòng nhập email đúng định dạng");
    }

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

    if (!validatePassword(password)) {
      return toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
      );
    }

    // call api
    try {
      const res = await PotCreateUser(dataCreateUser);
      if (res.statusCode === 200) {
        toast.success("Tạo người dùng thành công");
        onRefresh();
        CloseModal();
      } else {
        const msg =
          res.data?.message || res.message || "Tạo người dùng thất bại";
        toast.error(msg);
      }
    } catch (err) {
      console.error("Lỗi tạo người dùng:", err);
      toast.error("Đã xảy ra lỗi khi tạo người dùng");
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
                <FormCreateUser
                  setDataCreateUser={setDataCreateUser}
                  dataCreateUser={dataCreateUser}
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
