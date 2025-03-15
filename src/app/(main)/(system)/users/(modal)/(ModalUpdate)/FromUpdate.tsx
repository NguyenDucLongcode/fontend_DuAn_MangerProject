import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import { apiHooks } from "@/redux/services";
import { useEffect } from "react";
import { DataSubmitUpdateUser } from "@/redux/slices/system/user/modalUser/types";

const FromUpdateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dataGroups } = apiHooks.group.GetAllGroup();
  const { userId, formFieldsUpdate, dataUpdateUser } = useSelector(
    (state: RootState) => state.modelUserData
  );

  // handles
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    dispatch(actions.modalUser.updateUser({ [name]: value }));
  };

  useEffect(() => {
    if (userId) {
      dispatch(actions.modalUser.fetchUserById(userId));
    }
  }, [dispatch, userId]);

  // render
  return (
    <Form>
      {formFieldsUpdate.map((row, rowIndex) => (
        <Row className="mb-3" key={rowIndex}>
          {row.map(({ name, label, type, placeholder }, index) => (
            <Form.Group as={Col} key={index} controlId={`formGrid${name}`}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={handleInputChange}
                value={String(
                  dataUpdateUser?.[name as keyof DataSubmitUpdateUser] ?? "N/A"
                )}
              />
            </Form.Group>
          ))}
        </Row>
      ))}

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="sex"
            value={dataUpdateUser.sex ?? ""}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select
            name="groupId"
            onChange={handleInputChange}
            value={dataUpdateUser.groupId ?? ""}
          >
            <option value="">Select...</option>
            {dataGroups?.data.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default FromUpdateUser;
