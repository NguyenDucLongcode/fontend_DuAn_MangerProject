"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { apiHooks } from "@/redux/services";
import { actions } from "@/redux/slices/index";
import ReactPaginate from "react-paginate";
import { Table, Form } from "react-bootstrap";
import { RoleType } from "@/redux/slices/system/role/Assign-Group/types";
import { toast } from "react-toastify";
import Selected_Groups from "../(Selected_Groups)/Selected_Groups";

const Table_Assign_Group = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { dataAllRolesWithIdGroup, groupId } = useSelector(
    (state: RootState) => state.assignGroupData
  );

  const { refetchPaginationAssign } = useSelector(
    (state: RootState) => state.refetchData
  );

  const { currentPage, filterRole } = useSelector(
    (state: RootState) => state.paginationData
  );
  const pageSize = 6;

  // queries
  const [AssignAddRole] = apiHooks.roles.AssignAddRole();
  const [AssignRemoveRole] = apiHooks.roles.AssignRemoveRole();

  const { data: paginationData } = apiHooks.roles.GetPaginationRole({
    page: currentPage,
    limit: pageSize,
    url: filterRole.url,
    description: filterRole.description,
  });

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

  const fieldFilter = [
    { type: "text", name: "url", placeholder: "Filter Url..." },
    { type: "text", name: "description", placeholder: "Filter Description..." },
  ];

  // handle check box
  const isChecked = (id: number) => {
    return (
      Array.isArray(dataAllRolesWithIdGroup) &&
      dataAllRolesWithIdGroup.some((item) => item.id === id)
    );
  };

  // handle Assign
  const handleAssignRole = async (role: RoleType) => {
    if (!dataAllRolesWithIdGroup) {
      toast.error("Vui lòng chọn ít nhất một vai trò để chỉ định");
      return;
    }

    if (isChecked(role.id)) {
      try {
        if (groupId) {
          await AssignRemoveRole({ id: role.id, groupId });
        }
      } catch (err) {
        console.log(err);
      }

      dispatch(actions.assignGroup.removeRole(role.id)); // Nếu đã có thì xóa
      if (refetchPaginationAssign) {
        refetchPaginationAssign();
      }
    } else {
      // Assign Add role
      const data = { ...role, groupId: groupId };
      try {
        await AssignAddRole(data);
      } catch (err) {
        console.log(err);
      }

      dispatch(actions.assignGroup.addRole(role)); // Nếu chưa có thì thêm
      if (refetchPaginationAssign) {
        refetchPaginationAssign();
      }
    }
  };

  return (
    <div>
      <div className="table-container mt-4 container">
        <div className="mb-3 col-3 position-relative" style={{ zIndex: 20 }}>
          <Selected_Groups />
        </div>

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
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {paginationData?.data.length === 0 ? (
              <tr>
                <td colSpan={fieldFilter.length + 2} style={{ color: "black" }}>
                  No Data Found
                </td>
              </tr>
            ) : (
              <>
                {paginationData?.data.map((role, index) => {
                  return (
                    <tr key={`${index}-role`}>
                      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                      <td>{role.url}</td>
                      <td>{role.description}</td>
                      <td>
                        {/* check box */}
                        <Form.Check
                          type="checkbox"
                          id={`${index + 1}-role`}
                          label={
                            isChecked(role.id) === true ? "Allow" : "Not Allow"
                          }
                          checked={isChecked(role.id)}
                          onChange={() => handleAssignRole(role)}
                        />
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
    </div>
  );
};

export default Table_Assign_Group;
