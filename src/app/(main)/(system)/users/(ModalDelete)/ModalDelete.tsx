import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { actions } from "@/redux/slices";
import { apiHooks } from "@/redux/services";
import { toast } from "react-toastify";

function ModalDelete() {
  const dispatch = useDispatch();
  const [deleteUser] = apiHooks.DeleteUser();

  // Get data from Redux state
  const showModal = useSelector(
    (state: RootState) => state.modelUserData.type === "deleteUser"
  );

  const dataUser: Partial<User> = useSelector(
    (state: RootState) => state.modelUserData.data
  );

  const userLoin = useSelector((state: RootState) => state.authData.account);
  const refetchPagination = useSelector(
    (state: RootState) => state.refetchData.refetchPagination
  );
  const userLoginId = userLoin.id;

  const handleClose = (): void => {
    dispatch(actions.modalUser.hide());
  };
  const handleConfig = async () => {
    try {
      if (!userLoginId) {
        toast.error("Vui lòng đăng nhập để xóa tài khoản");
        return handleClose();
      }
      // check id user login with user wants delete

      if (userLoginId === dataUser.id) {
        toast.error("không thể xóa chính bạn được");
        return handleClose();
      }

      // call api
      if (dataUser.id !== undefined) {
        const res = await deleteUser(dataUser?.id).unwrap();
        if (res && res.data.errCode === 0) {
          toast.success(res.data.message);
          if (refetchPagination) {
            refetchPagination();
          } else {
            console.warn("refetchPagination is undefined.");
          }

          handleClose();
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error during config:", error);
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user?</Modal.Body>
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

export default ModalDelete;
