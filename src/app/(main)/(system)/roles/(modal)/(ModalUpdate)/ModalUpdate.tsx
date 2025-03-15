import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import { apiHooks } from "@/redux/services";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ModalUpdate = () => {
  // logic redux
  const dispatch = useDispatch<AppDispatch>();
  const { type, roleId, dataUpdateRole } = useSelector(
    (state: RootState) => state.modelRoleData
  );
  // queries
  const [updateRole] = apiHooks.roles.UpdateRole();

  const { refetchPaginationRole } = useSelector(
    (state: RootState) => state.refetchData
  );

  // handler
  const handleClose = () => dispatch(actions.modalRole.hide());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(actions.modalRole.updateRole({ [name]: value }));
  };

  console.log("check data", dataUpdateRole);

  const handleConfig = async () => {
    try {
      const res = await updateRole(dataUpdateRole).unwrap();
      if (res.errCode === 0) {
        toast.success(res.message);
        if (refetchPaginationRole) {
          refetchPaginationRole();
        }
        handleClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    if (roleId) {
      dispatch(actions.modalRole.fetchRoleById(roleId));
    }
  }, [dispatch, roleId]);

  //render

  return (
    <Modal
      show={type === "editRole"}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>update a new Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* from update */}
        <Form>
          <Row>
            <Col>
              <Form.Label>URL</Form.Label>
              <Form.Control
                name="url"
                value={dataUpdateRole?.url}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={dataUpdateRole?.description}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfig}>
          Config
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdate;
