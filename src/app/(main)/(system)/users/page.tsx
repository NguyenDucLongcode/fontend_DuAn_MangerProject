"use client";

import ModalCreate from "./(ModalCreate)/ModalCreate";
import ModalDelete from "./(ModalDelete)/ModalDelete";
import TableUser from "./(TableUser)/TableUser";
const ManagerUser = () => {
  return (
    <div className="managerUser container">
      <div className="table">
        <TableUser />
      </div>
      <ModalDelete />
      <ModalCreate />
    </div>
  );
};

export default ManagerUser;
