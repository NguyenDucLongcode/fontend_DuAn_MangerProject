"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SkewButton } from "@/components/ui/skewButton/skewButton";

import { GetUserPagination } from "@/services/user.servies/user.services";
import { AccountUserPagination } from "@/services/user.servies/type";
import ReactPaginate from "react-paginate";
import { formatISOToDate } from "@/utils/formatDate";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalUser } from "@/lib/redux/slices/modal/action";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

import Select from "react-select";
import { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import ModalUpdateUser from "./update/modalUpdate";
import ModalUserFilterDate from "./filter/modalDate";
import { setInforUser } from "@/lib/redux/slices/user/reducer";
import { InforUser } from "@/lib/redux/slices/user/type";
import ModalDeleteUser from "./delete/modalDelete";
import ModalCreateUser from "./create/modalCreate";

type OptionType = { value: string; label: string };

const TableUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { fromDate, toDate } = useSelector(
    (state: RootState) => state.datePicker
  );

  const LIMIT = 7;
  const options: OptionType[] = [
    { value: "", label: "All Role" },
    { value: "ADMIN", label: "ADMIN" },
    { value: "LEADER", label: "LEADER" },
    { value: "CODER", label: "CODER" },
    { value: "CUSTOMER", label: "CUSTOMER" },
  ];

  // State
  const [users, setUsers] = useState<AccountUserPagination[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [input, setInput] = useState({
    name: "",
    email: "",
  }); // For text input

  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);

  const searchParams = useMemo(
    () => ({
      name: input.name,
      email: input.email,
      role: selectedOption?.value || undefined,
      isActive: true,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [input, selectedOption, fromDate, toDate]
  );

  // Debounce
  const [debouncedParams, setDebouncedParams] = useState(searchParams);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
      setPage(1); // Reset page when filter changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GetUserPagination({
          limit: LIMIT,
          page,
          ...debouncedParams,
        });
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, debouncedParams, refreshTrigger]);

  // Handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  const handleUpdateUser = (user: InforUser) => {
    dispatch(setShowModalUser.userUpdate(true));
    dispatch(setInforUser(user));
  };

  // JSX
  return (
    <div className="p-5.5 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-1 text-blue-700">Bảng người dùng</h2>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        {/* Button Thêm người dùng */}
        <div className="flex justify-center md:justify-start">
          <SkewButton
            style={{ width: "200px", height: "40px" }}
            onClick={() => dispatch(setShowModalUser.userCreate(true))}
          >
            Thêm người dùng
          </SkewButton>
        </div>

        {/* Tìm kiếm và lọc theo ngày */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Tìm tên..."
            name="name"
            value={input.name}
            onChange={handleSearchChange}
            className="w-full sm:w-40"
          />
          <Input
            placeholder="Tìm email..."
            name="email"
            value={input.email}
            onChange={handleSearchChange}
            className="w-full sm:w-40"
          />
          <SkewButton
            style={{ width: "220px" }}
            onClick={() => dispatch(setShowModalUser.filterDate(true))}
          >
            Tìm theo ngày đăng kí
          </SkewButton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-200 scrollbar-hide">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-white">
            <tr>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-center">Tên</th>
              <th className="p-3 text-center">Email</th>
              <th className="p-3 text-center">Điện thoại</th>
              <th className="p-3 text-center">Ngày đăng kí</th>
              <th className="p-3 text-center">
                {/* select */}
                <Select
                  placeholder="Vai trò"
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  styles={{
                    singleValue: (base) => ({ ...base, color: "gray" }),
                    option: (base, state) => ({
                      ...base,
                      color: "gray",
                      backgroundColor: state.isFocused ? "#dbeafe" : "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }),
                  }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  menuPosition="fixed"
                />
              </th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="p-3">
                        <Skeleton className="h-4 w-full rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:-translate-y-0.5 hover:bg-blue-100 hover:z-10 hover:relative bg-white border-b border-gray-200"
                  >
                    <td className="p-3 font-medium">
                      {(page - 1) * LIMIT + index + 1}
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{formatISOToDate(user.createdAt)}</td>
                    <td className="p-3">{user.role}</td>
                    {/* action */}
                    <td className="p-3 text-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/users/${user.id}`)}
                      >
                        Xem
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          handleUpdateUser(user);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          dispatch(setShowModalUser.userDelete(true));
                        }}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

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

      <ModalUserFilterDate />
      <ModalUpdateUser
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />
      <ModalDeleteUser
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />
      <ModalCreateUser
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </div>
  );
};

export default TableUser;
