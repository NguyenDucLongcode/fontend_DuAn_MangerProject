import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { actions } from "@/redux/slices/index";
import { apiHooks } from "@/redux/services";
import { toast } from "react-toastify";
import { hookValidate } from "@/components/utilities";
import { Modal, Button } from "react-bootstrap";
import FromCreateUser from "./FormCreateUser";

const ModalCreate = () => {
  // logic redux
  const dispatch = useDispatch();
  const [createUser] = apiHooks.CreateUser();
  const { type, dataCreateUser } = useSelector(
    (state: RootState) => state.modelUserData
  );
  const refetchPagination = useSelector(
    (state: RootState) => state.refetchData.refetchPagination
  );

  // handler
  const handleClose = () => dispatch(actions.modalUser.hide());

  const handleConfig = async () => {
    const { email, password, address, groupId, phone, userName, sex } =
      dataCreateUser;

    if (
      !email ||
      !password ||
      !address ||
      !groupId ||
      !phone ||
      !userName ||
      !sex
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!hookValidate.phoneNumber(phone)) {
      toast.error("Số điện thoại từ 10 - 11 số");
      return;
    }
    if (!hookValidate.password(password)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    try {
      const res = await createUser(dataCreateUser).unwrap();
      if (res.errCode === 0) {
        toast.success(res.message);
        if (refetchPagination) {
          refetchPagination();
        }
        handleClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //render

  return (
    <Modal
      show={type === "createUser"}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FromCreateUser />
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

export default ModalCreate;
