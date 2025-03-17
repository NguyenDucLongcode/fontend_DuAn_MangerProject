"use client";
import { Form, Row, Col } from "react-bootstrap";
import { useCallback } from "react";
import { actions } from "@/redux/slices/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { apiHooks } from "@/redux/services";

const CreateRole = () => {
  // logic redux
  const dispatch = useDispatch<AppDispatch>();
  const [createRole] = apiHooks.roles.CreateRole();

  // state
  const { dataCreateRole } = useSelector(
    (state: RootState) => state.modelRoleData
  );
  const { refetchPaginationRole } = useSelector(
    (state: RootState) => state.refetchData
  );

  const fieldCreate = [
    {
      name: "url",
      placeholder: "Url",
      value: dataCreateRole.url || "",
    },
    {
      name: "description",
      placeholder: "Description",
      value: dataCreateRole.description || "",
    },
  ];

  const handleGetInputCreate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      dispatch(
        actions.modalRole.createRole({
          ...dataCreateRole,
          [name]: value,
        })
      );
    },
    [dataCreateRole, dispatch]
  );

  const handleCreateRole = async () => {
    try {
      const res = await createRole(dataCreateRole).unwrap();
      if (res.errCode === 0) {
        toast.success(res.message);
        dispatch(
          actions.modalRole.createRole({
            url: "",
            description: "",
          })
        );
        if (refetchPaginationRole) {
          refetchPaginationRole();
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-2">
        <Row className="g-0" style={{ backgroundColor: "transparent" }}>
          {fieldCreate.map((item, index) => {
            return (
              <Col
                key={index}
                xs={2}
                className={item.name === "description" ? "ms-2" : ""}
              >
                <Form.Control
                  value={item.value}
                  placeholder={item.placeholder}
                  name={item.name}
                  onChange={handleGetInputCreate}
                />
              </Col>
            );
          })}

          <Col xs={2}>
            <button className="btn btn-primary ms-3" onClick={handleCreateRole}>
              Create
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreateRole;
