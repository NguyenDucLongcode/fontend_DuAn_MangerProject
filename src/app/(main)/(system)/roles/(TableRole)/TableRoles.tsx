"use client";
import { Table } from "react-bootstrap";
import { useEffect, useCallback } from "react";
import { apiHooks } from "@/redux/services";
import { actions } from "@/redux/slices/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import ReactPaginate from "react-paginate";
import CreateRole from "../CreateRole/CreateRole";

const TableRoles = () => {
  const dispatch = useDispatch<AppDispatch>();

  //state
  const { currentPage, pageSize, filterRole } = useSelector(
    (state: RootState) => state.paginationData
  );

  // queries
  const { data: paginationData, refetch: refetchPaginationRole } =
    apiHooks.roles.GetPaginationRole({
      page: currentPage,
      limit: pageSize,
      url: filterRole.url,
      description: filterRole.description,
    });

  const fieldFilter = [
    { type: "text", name: "url", placeholder: "Filter Url..." },
    { type: "text", name: "description", placeholder: "Filter Description..." },
  ];

  // handler page current
  const handlePageClick = (event: { selected: number }) => {
    dispatch(actions.Pagination.setCurrentPage(event.selected + 1));
  };

  // handle filter
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    dispatch(actions.Pagination.setFilterRole({ [name]: value }));
  };
  // handle action
  const handleAction = useCallback(
    (action: string, role: PaginationRoleData) => {
      if (action === "deleteRole") {
        dispatch(actions.modalRole.show({ data: role, type: "deleteRole" }));
      }
      if (action === "editRole") {
        dispatch(actions.modalRole.show({ data: role, type: "editRole" }));
      }
    },
    [dispatch]
  );

  //useEffects
  useEffect(() => {
    if (refetchPaginationRole) {
      dispatch(actions.refetch.paginationRole(refetchPaginationRole)); // lưu hàm refresh pagination vào redux
    }
  }, [dispatch, refetchPaginationRole]);

  return (
    <div className="table-container mt-4 container">
      {/* create Role */}
      <CreateRole />

      {/* Table */}
      <Table responsive className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            {/* field filter */}
            {fieldFilter.map((field, index) => {
              return (
                <th key={`${index}+field`}>
                  <input
                    type={field.name}
                    placeholder={field.placeholder}
                    name={field.name}
                    onChange={handleFilterChange}
                  />
                </th>
              );
            })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginationData?.data.map((role, index) => {
            return (
              <tr key={`${index}-role`}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{role.url}</td>
                <td>{role.description}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleAction("editRole", role)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction("deleteRole", role)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* React Pagination */}
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={paginationData?.totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"selected"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};
export default TableRoles;
