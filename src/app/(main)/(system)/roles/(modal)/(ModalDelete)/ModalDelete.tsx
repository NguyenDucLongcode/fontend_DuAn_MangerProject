import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import { apiHooks } from "@/redux/services";
import { toast } from "react-toastify";

function ModalCreate() {
  // logic redux
  const dispatch = useDispatch();
  const [deleteRole] = apiHooks.roles.DeleteRole();

  const { type, roleId } = useSelector(
    (state: RootState) => state.modelRoleData
  );

  // refetch pagination
  const { refetchPaginationRole } = useSelector(
    (state: RootState) => state.refetchData
  );

  // handler
  const handleClose = (): void => {
    dispatch(actions.modalRole.hide());
  };

  const handleConfig = async () => {
    try {
      const res = await deleteRole(roleId).unwrap();
      console.log(res);
      if (res.errCode === 0) {
        toast.success(res.message);

        // refetch pagination
        if (refetchPaginationRole) {
          refetchPaginationRole();
        } else {
          console.warn("refetchPagination is undefined.");
        }
        handleClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        show={type === "deleteRole"}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete role?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfig}>
            Config
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreate;
