"use client";

import TableRole from "./(TableRole)/TableRoles";
import { ModalDelete, ModalCreate, ModalUpdate } from "./(modal)";

const ManagerRole = () => {
  return (
    <div className="managerRole container">
      <div className="table">
        <TableRole />
      </div>
      <ModalDelete />
      <ModalCreate />
      <ModalUpdate />
    </div>
  );
};
export default ManagerRole;
