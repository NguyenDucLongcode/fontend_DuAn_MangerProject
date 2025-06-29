"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalProject } from "@/lib/redux/slices/modal/action";
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
import FormCreateProject from "./formCreate";
import { PostCreateProject } from "@/services/project.services/project.services";

type Props = {
  onRefresh: () => void;
};

const initStateCreateProject = {
  name: "",
  description: "",
  groupId: "",
  avatar: null as File | null,
};

export default function ModalCreateProject({ onRefresh }: Props) {
  // state redux
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isCreateProject
  );

  const [dataCreateProject, setDataCreateProject] = useState(
    initStateCreateProject
  );

  // handler
  const CloseModal = () => {
    dispatch(setShowModalProject.projectCreate(false));
    setDataCreateProject(initStateCreateProject);
  };

  const handleSubmit = async () => {
    const { name } = dataCreateProject;
    // Validate
    if (!name.trim()) {
      return toast.error("Họ tên không được để trống");
    }

    // call api
    try {
      const res = await PostCreateProject(dataCreateProject);
      if (res.statusCode === 200) {
        toast.success("Tạo dự án thành công");
        onRefresh();
        CloseModal();
      } else {
        const msg = res.data?.message || res.message || "Tạo dự án thất bại";
        toast.error(msg);
      }
    } catch (err) {
      console.error("Lỗi tạo dự án:", err);
      toast.error("Đã xảy ra lỗi khi tạo dự án");
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
                <FormCreateProject
                  setDataCreateProject={setDataCreateProject}
                  dataCreateProject={dataCreateProject}
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
