"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalSubscription } from "@/lib/redux/slices/modal/action";
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

import FormCreateSubscription from "./formCreate";
import { PostCreateSubscription } from "@/services/subscription.services/subscription.services";

type Props = {
  onRefresh: () => void;
};

const initStateCreateSubscription = {
  userId: "",
  plan: "",
  expiresAt: "",
  price: "",
};

export default function ModalCreateSubscription({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isCreateSubscription
  );

  const [dataCreateSubscription, setDataCreateSubscription] = useState(
    initStateCreateSubscription
  );

  // handler
  const CloseModal = () => {
    dispatch(setShowModalSubscription.create(false));
    setDataCreateSubscription(initStateCreateSubscription);
  };

  const handleSubmit = async () => {
    const { userId, plan, price, expiresAt } = dataCreateSubscription;
    // Validate
    if (!userId) {
      return toast.error("Người dùng không được để trống");
    }

    if (!plan) {
      return toast.error("Gói đăng kí không được để trống");
    }

    if (Number(price) <= 0) {
      return toast.error("Giá không được nhỏ hơn 0");
    }

    // expiresAt  must be greater than current time
    if (expiresAt && new Date(expiresAt) < new Date()) {
      return toast.error("Ngày gia hạn không thể nhỏ hơn hiện tại");
    }

    // call api
    try {
      const res = await PostCreateSubscription(dataCreateSubscription);
      if (res.statusCode === 200) {
        toast.success("Tạo gói đăng kí thành công");
        onRefresh();
        CloseModal();
      } else {
        const msg =
          res.data?.message || res.message || "Tạo gói đăng kí thất bại";
        toast.error(msg);
      }
    } catch (err) {
      console.error("Lỗi tạo gói đăng kí:", err);
      toast.error("Đã xảy ra lỗi khi tạo gói đăng kí");
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
                <FormCreateSubscription
                  setDataCreateSubscription={setDataCreateSubscription}
                  dataCreateSubscription={dataCreateSubscription}
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
