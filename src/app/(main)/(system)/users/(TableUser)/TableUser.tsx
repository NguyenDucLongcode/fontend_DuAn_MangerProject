"use client";
import { useEffect, useCallback } from "react";
import { apiHooks } from "@/redux/services";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/redux/slices/index";
import { RootState, AppDispatch } from "@/redux/store";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

const TableUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  //state
  const { currentPage, pageSize, filterUser } = useSelector(
    (state: RootState) => state.paginationData
  );

  const fieldFilter = [
    { type: "text", name: "email", placeholder: "Filter Email..." },
    { type: "text", name: "name", placeholder: "Filter UserName..." },
  ];

  // queries
  const { data: dataGroups } = apiHooks.group.GetAllGroup();

  const { data: paginationData, refetch: refetchPaginationUser } =
    apiHooks.user.GetPagination({
      page: currentPage,
      limit: pageSize,
      name: filterUser.name,
      email: filterUser.email,
      groupId: filterUser.groupId,
    });

  // handle pagination
  const handlePageClick = (event: { selected: number }) => {
    dispatch(actions.Pagination.setCurrentPage(event.selected + 1));
  };

  // handle filter
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    dispatch(actions.Pagination.setFilterUser({ [name]: value }));
  };

  // handle action
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
    if (refetchPaginationUser) {
      dispatch(actions.refetch.paginationUser(refetchPaginationUser)); // lưu hàm refresh pagination vào redux
    }
  }, [dispatch, refetchPaginationUser]);

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
            <th>
              {/* select group */}
              <select
                className="select-group"
                value={filterUser.groupId}
                name="groupId"
                onChange={handleFilterChange}
              >
                <option value=""> All</option>
                {dataGroups?.data.map((group, index) => {
                  return (
                    <option key={`${index}+select`} value={group.id}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginationData?.data.length === 0 ? (
            <>
              <tr>
                <td colSpan={fieldFilter.length + 3} style={{ color: "black" }}>
                  No data found.
                </td>
              </tr>
            </>
          ) : (
            <>
              {paginationData?.data?.map((user, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.group.name}</td>
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
            </>
          )}
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
