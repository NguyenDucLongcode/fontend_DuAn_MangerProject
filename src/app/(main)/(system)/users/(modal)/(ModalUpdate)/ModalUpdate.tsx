import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import { apiHooks } from "@/redux/services";
import { toast } from "react-toastify";
import { hookValidate } from "@/components/utilities";
import { Modal, Button } from "react-bootstrap";
import FromUpdateUser from "./FromUpdate";

const ModalUpdate = () => {
  // logic redux
  const dispatch = useDispatch();
  const { type, dataUpdateUser } = useSelector(
    (state: RootState) => state.modelUserData
  );
  // queries
  const [updateUser] = apiHooks.user.UpdateUser();

  const { refetchPaginationUser } = useSelector(
    (state: RootState) => state.refetchData
  );

  // handler
  const handleClose = () => dispatch(actions.modalUser.hide());

  const handleConfig = async () => {
    if (!hookValidate.phoneNumber(dataUpdateUser.phone)) {
      toast.error("Số điện thoại từ 10 - 11 số");
      return;
    }

    try {
      const res = await updateUser(dataUpdateUser).unwrap();
      if (res.errCode === 0) {
        toast.success(res.message);
        if (refetchPaginationUser) {
          refetchPaginationUser();
        }
        handleClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //render

  return (
    <Modal
      show={type === "editUser"}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>update a new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FromUpdateUser />
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
