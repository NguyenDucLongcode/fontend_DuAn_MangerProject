"use client";

import { Input } from "@/components/ui/input";
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
import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";

// dataPicker
import DatePicker from "react-datepicker";

//icon
import { CalendarCheck } from "lucide-react";
import { setFromDate, setToDate } from "@/lib/redux/slices/datePick/reducer";
import { toast } from "react-toastify";

export default function ModalUserFilterDate() {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modalUser.isFilterDate
  );

  const startDateRef = useRef<InstanceType<typeof DatePicker> | null>(null);
  const endDateRef = useRef<InstanceType<typeof DatePicker> | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const CloseModal = () => {
    dispatch(setShowModalUser.filterDate(false));
  };

  //handle Click icon
  const handleStartIconClick = () => {
    startDateRef.current?.setOpen(true);
  };

  const handleEndIconClick = () => {
    endDateRef.current?.setOpen(true);
  };

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      toast.warn("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc");
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc");
      setEndDate(null);
      return;
    }

    // dispath redux
    dispatch(setFromDate(formatDate(startDate)));
    dispatch(setToDate(formatDate(endDate)));

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
            <DialogPanel className="w-full max-w-lvh transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all ">
              <DialogTitle className="text-lg font-medium text-gray-900">
                Lọc theo ngày
              </DialogTitle>

              {/* content */}
              <div className="space-y-6 mt-9 mx-4">
                <div className="flex space-y-2 gap-3 items-center">
                  <label className="font-light">Ngày bắt đầu</label>
                  <div className="flex gap-4">
                    <Input
                      placeholder="Ngày"
                      value={
                        startDate
                          ? String(startDate.getDate()).padStart(2, "0")
                          : ""
                      }
                      readOnly
                      style={{ width: "100px" }}
                    />
                    <Input
                      placeholder="Tháng"
                      value={
                        startDate
                          ? String(startDate.getMonth() + 1).padStart(2, "0")
                          : ""
                      }
                      readOnly
                      style={{ width: "100px" }}
                    />
                    <Input
                      placeholder="Năm"
                      value={startDate ? String(startDate.getFullYear()) : ""}
                      readOnly
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      ref={startDateRef}
                      popperPlacement="bottom"
                      className="hidden" // ẩn input mặc định
                      dateFormat="dd/MM/yyyy"
                    />
                    <button
                      type="button"
                      onClick={handleStartIconClick}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <CalendarCheck className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* End Date */}
                <div className="flex items-center space-y-2 gap-3 ">
                  <label className="font-light">Ngày kết thúc</label>
                  <div className="flex gap-4">
                    <Input
                      placeholder="Ngày"
                      value={
                        endDate
                          ? String(endDate.getDate()).padStart(2, "0")
                          : ""
                      }
                      readOnly
                      style={{ width: "100px" }}
                    />
                    <Input
                      placeholder="Tháng"
                      value={
                        endDate
                          ? String(endDate.getMonth() + 1).padStart(2, "0")
                          : ""
                      }
                      readOnly
                      style={{ width: "100px" }}
                    />
                    <Input
                      placeholder="Năm"
                      value={endDate ? String(endDate.getFullYear()) : ""}
                      readOnly
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      ref={endDateRef}
                      popperPlacement="bottom"
                      className="hidden" // ẩn input mặc định
                      dateFormat="dd/MM/yyyy"
                    />
                    <button
                      type="button"
                      onClick={handleEndIconClick}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <CalendarCheck className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

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
