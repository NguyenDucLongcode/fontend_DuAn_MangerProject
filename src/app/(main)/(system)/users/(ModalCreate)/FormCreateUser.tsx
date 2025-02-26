import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { actions } from "@/redux/slices";
import { apiHooks } from "@/redux/services";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FromCreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dataGroups } = apiHooks.GetAllGroup();
  const { showPassword, formFields } = useSelector(
    (state: RootState) => state.modelUserData
  );

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    dispatch(actions.modalUser.createUser({ [name]: value }));
  };

  return (
    <Form>
      {formFields.map((row, rowIndex) => (
        <Row className="mb-3" key={rowIndex}>
          {row.map(({ name, label, type, placeholder }, index) => (
            <Form.Group as={Col} key={index} controlId={`formGrid${name}`}>
              <Form.Label>{label}</Form.Label>
              {name === "password" ? (
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    name={name}
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text
                    onClick={() => dispatch(actions.modalUser.togglePassword())}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              ) : (
                <Form.Control
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  onChange={handleInputChange}
                />
              )}
            </Form.Group>
          ))}
        </Row>
      ))}

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select name="sex" onChange={handleInputChange}>
            <option value="">Select...</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select name="groupId" onChange={handleInputChange}>
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

export default FromCreateUser;
