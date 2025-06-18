import { Input } from "@headlessui/react";

const FormUpdateUser = () => {
  return (
    <div>
      {/* content */}
      <div className="space-y-6 mt-9 mx-4">
        <div className="flex space-y-2 gap-3 items-center">
          <div className="flex gap-4">
            <Input placeholder="Tìm tên, email..." />
          </div>
        </div>

        {/* End Date */}
        <div className="flex items-center space-y-2 gap-3 ">
          <label className="font-light">Ngày kết thúc</label>
          <div className="flex gap-4">
            <Input placeholder="Ngày" style={{ width: "100px" }} />
            <Input placeholder="Tháng" readOnly style={{ width: "100px" }} />
            <Input placeholder="Năm" readOnly style={{ width: "100px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUpdateUser;
