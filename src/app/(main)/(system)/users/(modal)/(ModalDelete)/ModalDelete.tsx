import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import { apiHooks } from "@/redux/services";
import { toast } from "react-toastify";

function ModalDelete() {
  const dispatch = useDispatch();
  const [deleteUser] = apiHooks.user.DeleteUser();

  // Get data from Redux state
  const showModal = useSelector(
    (state: RootState) => state.modelUserData.type === "deleteUser"
  );

  const dataUser = useSelector((state: RootState) => state.modelUserData.data);

  const { account } = useSelector((state: RootState) => state.authReducerData);
  const { refetchPaginationUser } = useSelector(
    (state: RootState) => state.refetchData
  );

  const handleClose = (): void => {
    dispatch(actions.modalUser.hide());
  };
  const handleConfig = async () => {
    try {
      // not allowed delete own
      if (account?.email === dataUser.email) {
        toast.error("không thể xóa chính bạn được");
        return handleClose();
      }

      // call api
      if (dataUser.id !== undefined) {
        const res = await deleteUser(dataUser?.id).unwrap();
        if (res && res.errCode === 0) {
          toast.success(res.message);
          if (refetchPaginationUser) {
            refetchPaginationUser();
          } else {
            console.warn("refetchPagination is undefined.");
          }

          handleClose();
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
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
