"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SkewButton } from "@/components/ui/skewButton/skewButton";

import ReactPaginate from "react-paginate";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalGroup } from "@/lib/redux/slices/modal/action";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

import Select from "react-select";
import { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import { GetGroupDevPagination } from "@/services/groupDev.services/groupDev.services";
import { GroupDev } from "@/services/groupDev.services/type";
import { formatISOToDate } from "@/utils/formatDate";
import ModalGroupFilterDate from "./filter/modalDate";
import ModalCreateGroup from "./create/modalCreate";
import ModalUpdateGroupDev from "./update/modalUpdate";
import { InforGroup } from "@/lib/redux/slices/groupDev/type";
import { setInforGroupDev } from "@/lib/redux/slices/groupDev/reducer";
import ModalDeleteGroupDev from "./delete/modalDelete";

type OptionType = { value: string; label: string };

const TableGroupDevs = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { fromDate, toDate } = useSelector(
    (state: RootState) => state.datePicker
  );

  const LIMIT = 7;
  const options: OptionType[] = [
    { value: "", label: "Hiển Thị" },
    { value: "PRIVATE", label: "PRIVATE" },
    { value: "PUBLIC", label: "PUBLIC" },
    { value: "RESTRICTED", label: "RESTRICTED" },
  ];

  // State
  const [groupDevs, setGroupDevs] = useState<GroupDev[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [input, setInput] = useState({
    name: "",
    maxMembers: "",
  }); // For text input

  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);

  const searchParams = useMemo(
    () => ({
      name: input.name,
      maxMembers: input.maxMembers || undefined,
      visibility: selectedOption?.value || undefined,
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
        const res = await GetGroupDevPagination({
          limit: LIMIT,
          page,
          ...debouncedParams,
        });
        setGroupDevs(res.data.groupDevs);
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

  const handleUpdateGroup = (user: InforGroup) => {
    dispatch(setShowModalGroup.groupUpdate(true));
    dispatch(setInforGroupDev(user));
  };

  const handleDelateGroup = (user: InforGroup) => {
    dispatch(setShowModalGroup.groupDelete(true));
    dispatch(setInforGroupDev(user));
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
            onClick={() => dispatch(setShowModalGroup.groupCreate(true))}
          >
            Thêm Nhóm
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
            type="number"
            placeholder="Số thành viên..."
            name="maxMembers"
            value={input.maxMembers}
            onChange={handleSearchChange}
            className="w-full sm:w-40"
          />
          <SkewButton
            style={{ width: "220px" }}
            onClick={() => dispatch(setShowModalGroup.filterDate(true))}
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
              <th className="p-3 text-center">Số Thành viên</th>
              <th className="p-3 text-center">Ngày đăng kí</th>
              <th className="p-3 text-center">
                {/* select */}
                <Select
                  placeholder="Hiển thị..."
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
            {!loading && groupDevs.length === 0 && (
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
              : groupDevs.map((group, index) => (
                  <tr
                    key={group.id}
                    className="transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:-translate-y-0.5 hover:bg-blue-100 hover:z-10 hover:relative bg-white border-b border-gray-200"
                  >
                    <td className="p-3 font-medium">
                      {(page - 1) * LIMIT + index + 1}
                    </td>
                    <td className="p-3">{group.name}</td>
                    <td className="p-3">{group.maxMembers}</td>
                    <td className="p-3">{formatISOToDate(group.createdAt)}</td>
                    <td className="p-3">{group.visibility}</td>
                    {/* action */}
                    <td className="p-3 text-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/groupDevs/${group.id}`)
                        }
                      >
                        Xem
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          handleUpdateGroup(group);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          handleDelateGroup(group);
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

      <ModalGroupFilterDate />

      <ModalCreateGroup
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />
      <ModalUpdateGroupDev
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <ModalDeleteGroupDev
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </div>
  );
};

export default TableGroupDevs;
