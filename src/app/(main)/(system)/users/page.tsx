"use client";

import ModalCreate from "./(modal)/(ModalCreate)/ModalCreate";
import ModalDelete from "./(modal)/(ModalDelete)/ModalDelete";
import ModalUpdate from "./(modal)/(ModalUpdate)/ModalUpdate";
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
