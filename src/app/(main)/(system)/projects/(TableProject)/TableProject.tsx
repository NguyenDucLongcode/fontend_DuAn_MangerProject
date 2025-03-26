"use client";
import { Table } from "react-bootstrap";
import { useEffect, useCallback } from "react";
import { apiHooks } from "@/redux/services";
import { actions } from "@/redux/slices/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import ReactPaginate from "react-paginate";

const TableProject = () => {
  const dispatch = useDispatch<AppDispatch>();

  //state
  const { currentPage, pageSize, filterProject } = useSelector(
    (state: RootState) => state.paginationData
  );

  // queries
  const { data: paginationData, refetch: refetchPaginationProject } =
    apiHooks.project.GetPaginationProject({
      page: currentPage,
      limit: pageSize,
      name: filterProject.name,
      description: filterProject.description,
    });

  const fieldFilter = [
    { type: "text", name: "name", placeholder: "Filter Url..." },
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
    dispatch(actions.Pagination.setFilterProject({ [name]: value }));
  };

  // handle action
  const handleAction = useCallback(
    (action: string, project: PaginationProjectData) => {
      if (action === "deleteRole") {
        dispatch(
          actions.modalProject.show({ data: project, type: "deleteRole" })
        );
      }
      if (action === "editRole") {
        dispatch(
          actions.modalProject.show({ data: project, type: "editRole" })
        );
      }
    },
    [dispatch]
  );

  //useEffects
  useEffect(() => {
    if (refetchPaginationProject) {
      dispatch(actions.refetch.paginationProject(refetchPaginationProject)); // lưu hàm refresh pagination vào redux
    }
  }, [dispatch, refetchPaginationProject]);

  return (
    <div className="table-container mt-4 container">
      {/* create Role */}

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
          {paginationData?.data.map((project, index) => {
            return (
              <tr key={`${index}-role`}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleAction("editRole", project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction("deleteRole", project)}
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
export default TableProject;
