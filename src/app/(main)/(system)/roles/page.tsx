"use client";

import TableRole from "./(TableRole)/TableRoles";
import { ModalDelete, ModalUpdate } from "./(modal)";

const ManagerRole = () => {
  return (
    <div className="managerRole container">
      <div className="table">
        <TableRole />
      </div>
      <ModalDelete />
      <ModalUpdate />
    </div>
  );
};
export default ManagerRole;
