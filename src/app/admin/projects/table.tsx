"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SkewButton } from "@/components/ui/skewButton/skewButton";

import ReactPaginate from "react-paginate";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setShowModalProject } from "@/lib/redux/slices/modal/action";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

import Select from "react-select";
import { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import { GetGroupDevPagination } from "@/services/groupDev.services/groupDev.services";
import { GroupDev } from "@/services/groupDev.services/type";
import { formatISOToDate } from "@/utils/formatDate";
import { ProjectPagination } from "@/services/project.services/project.services";
import { Project } from "@/services/project.services/type";
import ModalProjectFilterDate from "./filter/modalDate";
import ModalCreateProject from "./create/modalCreate";
import { InforProject } from "@/lib/redux/slices/project/type";
import { setInforProject } from "@/lib/redux/slices/project/reducer";
import ModalUpdateProject from "./update/modalUpdate";
import ModalDeleteProject from "./delete/modalDelete";

type OptionType = { value: string; label: string };

const TableProjects = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { fromDate, toDate } = useSelector(
    (state: RootState) => state.datePicker
  );

  const LIMIT = 7;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // state group
  const [input, setInput] = useState({ name: "" });
  const [inputGroupName, setInputGroupName] = useState("");
  const [groupOptions, setGroupOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);

  // search filter
  const searchParams = useMemo(
    () => ({
      name: input.name,
      groupId: selectedOption?.value || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [input, selectedOption, fromDate, toDate]
  );

  const [debouncedParams, setDebouncedParams] = useState(searchParams);

  // handler
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

  const handleUpdateProject = (project: InforProject) => {
    dispatch(setShowModalProject.projectUpdate(true));
    dispatch(setInforProject(project));
  };

  const handleDelateProject = (project: InforProject) => {
    dispatch(setShowModalProject.projectDelete(true));
    dispatch(setInforProject(project));
  };

  // useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Fetch project data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ProjectPagination({
          limit: LIMIT,
          page,
          ...debouncedParams,
        });
        setProjects(res.data.projects);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Lỗi lấy danh sách dự án:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, debouncedParams, refreshTrigger]);

  // Fetch group options when input changes
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await GetGroupDevPagination({
          limit: 10,
          page: 1,
          name: inputGroupName,
          maxMembers: undefined,
          visibility: undefined,
          fromDate: undefined,
          toDate: undefined,
        });

        const mappedOptions = res.data.groupDevs.map((group: GroupDev) => ({
          label: group.name,
          value: group.id,
        }));

        setGroupOptions(mappedOptions);
      } catch (err) {
        console.error("Lỗi lọc nhóm:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputGroupName]);

  return (
    <div className="p-5.5 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-1 text-blue-700">Bảng người dùng</h2>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <div className="flex justify-center md:justify-start">
          <SkewButton
            style={{ width: "200px", height: "40px" }}
            onClick={() => dispatch(setShowModalProject.projectCreate(true))}
          >
            Thêm Nhóm
          </SkewButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Tìm tên dự án..."
            name="name"
            value={input.name}
            onChange={handleSearchChange}
            className="w-full sm:w-40"
          />
          <SkewButton
            style={{ width: "220px" }}
            onClick={() => dispatch(setShowModalProject.filterDate(true))}
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
              <th className="p-3 text-center">Ngày đăng kí</th>
              <th className="p-3 text-center">
                <Select
                  placeholder="Tìm nhóm dev..."
                  value={selectedOption}
                  onChange={setSelectedOption}
                  onInputChange={(value) => setInputGroupName(value)}
                  options={groupOptions}
                  isClearable
                  styles={{
                    // container: (base) => ({
                    //   ...base,
                    //   // width: 220,
                    // }),
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
              <th className="p-3 text-center">Thành viên</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {!loading && projects.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
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
              : projects.map((project, index) => (
                  <tr
                    key={project.id}
                    className="transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:-translate-y-0.5 hover:bg-blue-100 hover:z-10 hover:relative bg-white border-b border-gray-200"
                  >
                    <td className="p-3 font-medium">
                      {(page - 1) * LIMIT + index + 1}
                    </td>
                    <td className="p-3">{project.name}</td>

                    <td className="p-3 ">
                      {formatISOToDate(project.createdAt)}
                    </td>
                    <td className="p-3">
                      {project.group?.name ?? "Không có nhóm"}
                    </td>
                    <td className="p-3">{project.group.maxMembers ?? "0"}</td>

                    <td className="p-3 text-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/projects/${project.id}`)
                        }
                      >
                        Xem
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          handleUpdateProject(project);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          handleDelateProject(project);
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

      {/* modal */}
      <ModalProjectFilterDate />
      <ModalCreateProject
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <ModalUpdateProject
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <ModalDeleteProject
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />

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

export default TableProjects;
