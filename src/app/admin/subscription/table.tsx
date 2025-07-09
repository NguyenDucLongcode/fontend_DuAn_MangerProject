"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SkewButton } from "@/components/ui/skewButton/skewButton";

import ReactPaginate from "react-paginate";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalSubscription } from "@/lib/redux/slices/modal/action";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

import Select, { SingleValue } from "react-select";

import { formatISOToDate } from "@/utils/formatDate";
import { GetSupscriptionPagination } from "@/services/subscription.services/subscription.services";
import { Subscription } from "@/services/subscription.services/type";
import { GetUserPagination } from "@/services/user.servies/user.services";
import { AccountUser } from "@/services/auth.services/type";
import ModalCreateSubscription from "./create/modalCreate";
import ModalProjectFilterDate from "./filter/modalDate";
import ModalUpdateSubscription from "./update/modalUpdate";
import { setInforSubScription } from "@/lib/redux/slices/subscription/reducer";
import ModalDeleteSubscription from "./delete/modalDelete";

// Select option type
interface OptionType {
  value: string;
  label: string;
}

// Fixed subscription plan options
const optionsPlan: OptionType[] = [
  { value: "FREE", label: "Miễn phí" },
  { value: "BASIC", label: "Cơ bản" },
  { value: "PRO", label: "Nâng cao" },
  { value: "ENTERPRISE", label: "Doanh nghiệp" },
];

const TableSubscription = () => {
  const dispatch = useAppDispatch();
  const { fromDate, toDate } = useSelector(
    (state: RootState) => state.datePicker
  );

  const LIMIT = 7;

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Filter state
  const [inputUserName, setInputUserName] = useState("");
  const [userOptions, setUserOptions] = useState<OptionType[]>([]);
  const [selectedUser, setSelectedUser] =
    useState<SingleValue<OptionType>>(null);
  const [selectedPlan, setSelectedPlan] =
    useState<SingleValue<OptionType>>(null);

  // Compose filter parameters
  const searchParams = useMemo(
    () => ({
      plan: selectedPlan?.value || undefined,
      userId: selectedUser?.value || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [selectedPlan, selectedUser, fromDate, toDate]
  );

  const [debouncedParams, setDebouncedParams] = useState(searchParams);

  // Debounce filter params
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Fetch subscription list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GetSupscriptionPagination({
          limit: LIMIT,
          page,
          ...debouncedParams,
        });
        setSubscriptions(res.data.subscriptions);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Lỗi lấy danh sách subscription:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, debouncedParams, refreshTrigger]);

  // Fetch user options for select
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await GetUserPagination({
          limit: 10,
          page: 1,
          name: inputUserName,
          email: undefined,
          role: undefined,
          isActive: true,
          fromDate: undefined,
          toDate: undefined,
        });

        const mappedOptions: OptionType[] = res.data.users.map(
          (user: AccountUser) => ({
            label: user.name ?? "Không tên",
            value: user.id,
          })
        );

        setUserOptions(mappedOptions);
      } catch (err) {
        console.error("Lỗi lọc người dùng:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputUserName]);

  const handlePageClick = (event: { selected: number }) =>
    setPage(event.selected + 1);

  const handlerUpdate = (subscriptions: Subscription) => {
    dispatch(setShowModalSubscription.update(true));
    dispatch(setInforSubScription(subscriptions));
  };

  const handlerDelete = (subscriptions: Subscription) => {
    dispatch(setShowModalSubscription.delete(true));
    dispatch(setInforSubScription(subscriptions));
  };

  return (
    <div className="p-5.5 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-1 text-blue-700">Gói người dùng</h2>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <SkewButton
          style={{ width: "200px", height: "40px" }}
          onClick={() => dispatch(setShowModalSubscription.create(true))}
        >
          Thêm gói
        </SkewButton>
        <SkewButton
          style={{ width: "220px" }}
          onClick={() => dispatch(setShowModalSubscription.filterDate(true))}
        >
          Tìm theo ngày đăng kí
        </SkewButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-200 scrollbar-hide">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-white">
            <tr>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-center">
                <Select
                  placeholder="Tìm người dùng..."
                  value={selectedUser}
                  onChange={setSelectedUser}
                  onInputChange={(value) => setInputUserName(value)}
                  options={userOptions}
                  isClearable
                  styles={{
                    singleValue: (base) => ({ ...base, color: "gray" }),
                  }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  menuPosition="fixed"
                />
              </th>
              <th className="p-3 text-center">
                <Select
                  placeholder="Tìm gói..."
                  value={selectedPlan}
                  onChange={setSelectedPlan}
                  options={optionsPlan}
                  isClearable
                  styles={{
                    singleValue: (base) => ({ ...base, color: "gray" }),
                  }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  menuPosition="fixed"
                />
              </th>
              <th className="p-3 text-center">Ngày đăng kí</th>
              <th className="p-3 text-center">Ngày hết hạn</th>
              <th className="p-3 text-center">Giá</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="p-3">
                      <Skeleton className="h-4 w-full rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : subscriptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            ) : (
              subscriptions.map((subscription, index) => (
                <tr
                  key={`subscription-${subscription.id}`}
                  className="transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:-translate-y-0.5 hover:bg-blue-100 hover:z-10 hover:relative bg-white border-b border-gray-200"
                >
                  <td className="p-3 font-medium">
                    {(page - 1) * LIMIT + index + 1}
                  </td>
                  <td className="p-3">{subscription.user.name}</td>
                  <td className="p-3">{subscription.plan}</td>
                  <td className="p-3">
                    {formatISOToDate(subscription.createdAt)}
                  </td>
                  <td className="p-3">
                    {formatISOToDate(subscription.expiresAt)}
                  </td>
                  <td className="p-3">{subscription.price ?? 0} VNĐ</td>
                  <td className="p-3 text-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlerUpdate(subscription)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handlerDelete(subscription)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal date filter */}
      <ModalProjectFilterDate />

      <ModalCreateSubscription
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <ModalUpdateSubscription
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <ModalDeleteSubscription
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Trang sau ›"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          previousLabel="‹ Trang trước"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center gap-2"
          pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-blue-100"
          activeClassName="bg-blue-600 text-white"
          previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-blue-100"
          nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-blue-100"
          breakClassName="px-2"
        />
      </div>
    </div>
  );
};

export default TableSubscription;
