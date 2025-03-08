"use client";
import { useMemo, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { apiHooks } from "@/redux/services";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/redux/slices/index";
import { RootState, AppDispatch } from "@/redux/store";

interface User {
  No: number;
  email: string;
  userName: string;
  phone: string;
  group: string;
  id: number;
}

interface ItemUser {
  id: number | string;
  name: string;
  email?: string;
  phone?: string;
  dataGroup?: {
    name?: string;
  };
}

export {};

const TableUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  //state
  const { currentPage, pageSize, filterText, gotoPage } = useSelector(
    (state: RootState) => state.paginationData
  );

  // queries
  const { data: paginationData, refetch: refetchPagination } =
    apiHooks.GetPagination({
      page: currentPage,
      limit: pageSize,
    });

  // data table
  const users: User[] = useMemo(() => {
    if (!paginationData?.data?.data) return [];
    return (
      paginationData?.data?.data

        .map((user: ItemUser, index: number) => ({
          No: index + 1 + (currentPage - 1) * pageSize,
          email: user?.email || "N/A",
          userName: user?.name || "N/A",
          phone: user?.phone || "N/A",
          group: user?.dataGroup?.name || "N/A",
          id: user.id || "N/A",
        }))

        .filter((user: ItemUser) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
          )
        ) || []
    );
  }, [paginationData, currentPage, pageSize, filterText]);

  // data columns
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      { accessorKey: "No", header: "No" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "userName", header: "User Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "group", header: "Group" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleAction("View", row.original)}
              className="btn btn-secondary"
            >
              View
            </button>
            <button
              onClick={() => handleAction("editUser", row.original)}
              className="btn btn-warning mx-3"
            >
              Edit
            </button>
            <button
              onClick={() => handleAction("deleteUser", row.original)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  //init table
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(), // Xử lý hàng cốt lõi (core rows)
    getPaginationRowModel: getPaginationRowModel(), //phân trang (pagination)
    manualPagination: true, // dùng phân trang thủ công
    pageCount: paginationData?.data?.totalPages || 0, // số dòng trên 1 trang
  });

  // handler

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(actions.Pagination.setPageSize(e.target.value));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPage = Number(e.target.value);
      dispatch(actions.Pagination.setGoToPage(newPage));
      if (newPage >= 1 && newPage <= (paginationData?.data?.totalPages || 1)) {
        dispatch(actions.Pagination.setCurrentPage(newPage));
      }
    },
    [dispatch, paginationData?.data?.totalPages]
  );

  const handleAction = useCallback(
    (action: string, user: User) => {
      if (action === "deleteUser") {
        dispatch(actions.modalUser.show({ data: user, type: "deleteUser" }));
      }
      if (action === "editUser") {
        dispatch(actions.modalUser.show({ data: user, type: "editUser" }));
      }
    },
    [dispatch]
  );

  const handleCreate = useCallback(() => {
    dispatch(actions.modalUser.showCreateModal());
  }, [dispatch]);

  //useEffects
  useEffect(() => {
    if (refetchPagination) {
      dispatch(actions.refetch.pagination(refetchPagination)); // lưu hàm refresh pagination vào redux
    }
  }, [dispatch, refetchPagination]);

  // render
  return (
    <div className="tableWrapper">
      {/* content top */}
      <div className="content-top">
        <div>
          <button className="btn btn-primary" onClick={handleCreate}>
            Add user
          </button>
        </div>
        {/* filter */}
        <div className="filterWrapper">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch(actions.Pagination.setFilterText(e.target.value));
            }}
          />
          <span className="bg-icon">
            <FaMagnifyingGlass className="icon_filter" />
          </span>
        </div>
      </div>
      {/* table */}
      <table className="reactTable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <div className="pagination">
        <button
          onClick={() =>
            dispatch(
              actions.Pagination.setCurrentPage(Math.max(currentPage - 1, 1))
            )
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {paginationData?.data?.totalPages || 0}
        </span>
        <button
          onClick={() =>
            dispatch(
              actions.Pagination.setCurrentPage(
                Math.min(currentPage + 1, paginationData?.data?.totalPages || 0)
              )
            )
          }
          disabled={currentPage === (paginationData?.data?.totalPages || 0)}
        >
          Next
        </button>
        {/* go to page */}
        <div className="page-input">
          <span>Go to page</span>
          <input
            type="number"
            min="1"
            max={paginationData?.data?.totalPages || 1}
            value={`${gotoPage}`}
            onChange={handlePageChange}
          />
        </div>
        {/* show per page */}
        <select value={pageSize} onChange={handlePageSizeChange}>
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableUser;
