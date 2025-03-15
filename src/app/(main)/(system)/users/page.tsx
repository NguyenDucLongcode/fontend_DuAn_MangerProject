"use client";

import { ModalCreate, ModalDelete, ModalUpdate } from "./(modal)";
import TableUser from "./(TableUser)/TableUser";
const ManagerUser = () => {
  return (
    <div className="managerUser container">
      <div className="table">
        <TableUser />
      </div>
      <ModalDelete />
      <ModalCreate />
      <ModalUpdate />
    </div>
  );
};
export default ManagerUser;
