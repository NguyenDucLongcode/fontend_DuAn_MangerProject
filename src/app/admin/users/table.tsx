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

  const [input, setInput] = useState(""); // For text input
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);

  const searchParams = useMemo(
    () => ({
      name: input,
      email: input,
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
  }, [page, debouncedParams]);

  // Handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  // JSX
  return (
    <div className="p-4 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Bảng người dùng</h2>
      <div className="flex justify-between gap-4 mb-4">
        <SkewButton style={{ width: "200px", height: "40px" }}>
          Thêm người dùng
        </SkewButton>

        <div className="flex gap-4">
          <Input
            placeholder="Tìm tên, email..."
            value={input}
            onChange={handleSearchChange}
          />
          <SkewButton
            style={{ width: "250px" }}
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
                        onClick={() =>
                          dispatch(setShowModalUser.userUpdate(true))
                        }
                      >
                        Sửa
                      </Button>
                      <Button variant="destructive" size="sm">
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
      <ModalUpdateUser />
    </div>
  );
};

export default TableUser;
