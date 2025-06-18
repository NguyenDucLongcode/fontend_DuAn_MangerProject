"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalUser } from "@/lib/redux/slices/modal/action";
import { RootState } from "@/lib/redux/store";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import FormUpdateUser from "./formUpdate";

export default function ModalUpdateUser() {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isUpdateUser
  );

  const CloseModal = () => {
    dispatch(setShowModalUser.userUpdate(false));
  };

  const handleSubmit = () => {
    CloseModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={CloseModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-[1000px] max-w-full-full h-[600px] max-h-full transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all ">
              <DialogTitle className="text-lg font-medium text-gray-900">
                Lọc theo ngày
              </DialogTitle>
              {/* content */}
              <FormUpdateUser />
              {/* Button control */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={handleSubmit}
                >
                  Lọc dữ liệu
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={CloseModal}
                >
                  Thoát
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
