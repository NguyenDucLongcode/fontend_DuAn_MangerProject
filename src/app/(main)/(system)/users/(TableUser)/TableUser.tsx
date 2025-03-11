"use client";
import { useEffect, useCallback } from "react";
import { apiHooks } from "@/redux/services";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/redux/slices/index";
import { RootState, AppDispatch } from "@/redux/store";
import Table from "react-bootstrap/Table";
import "./TableUser.scss";
import ReactPaginate from "react-paginate";

const TableUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  //state
  const { currentPage, pageSize, filterUser } = useSelector(
    (state: RootState) => state.paginationData
  );
  console.log(filterUser);

  const fieldFilter = [
    { type: "text", name: "email", placeholder: "Filter Email..." },
    { type: "text", name: "name", placeholder: "Filter UserName..." },
    { type: "text", name: "group", placeholder: "Filter Group..." },
  ];

  // queries
  const { data: paginationData, refetch: refetchPagination } =
    apiHooks.GetPagination({
      page: currentPage,
      limit: pageSize,
    });

  // handle pagination
  const handlePageClick = (event: { selected: number }) => {
    dispatch(actions.Pagination.setCurrentPage(event.selected + 1));
  };
  // handle filter
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(actions.Pagination.setFilterUser({ [name]: value }));
  };

  const handleAction = useCallback(
    (action: string, user: PaginationUserData) => {
      if (action === "deleteUser") {
        dispatch(actions.modalUser.show({ data: user, type: "deleteUser" }));
      }
      if (action === "editUser") {
        dispatch(actions.modalUser.show({ data: user, type: "editUser" }));
      }
    },
    [dispatch]
  );

  const handleCreateModal = useCallback(() => {
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
    <div className="table-container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleCreateModal}>
        Create New User
      </button>
      <Table responsive className="custom-table">
        <thead>
          <tr>
            <th>No</th>
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
          {paginationData?.data?.map((user, index: number) => {
            return (
              <tr key={index}>
                <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.dataGroup.name}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleAction("viewUser", user)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleAction("editUser", user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction("deleteUser", user)}
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

export default TableUser;
