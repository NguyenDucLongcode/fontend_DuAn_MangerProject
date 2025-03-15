import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import FormCreateRole from "./FormCreateRole";
// import { apiHooks } from "@/redux/services";

function ModalCreate() {
  // logic redux
  const dispatch = useDispatch();
  const { type } = useSelector((state: RootState) => state.modelRoleData);

  // handler
  const handleClose = (): void => {
    dispatch(actions.modalRole.hide());
  };

  return (
    <>
      <Modal
        show={type === "createRole"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCreateRole />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreate;
