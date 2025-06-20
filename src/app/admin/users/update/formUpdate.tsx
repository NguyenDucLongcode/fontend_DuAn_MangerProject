import { FileInput } from "@/components/ui/fileInput";
import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SingleValue } from "react-select";
import Select from "react-select";

type OptionType = { value: string; label: string };
type Props = {
  dataUpdateUser: {
    id: string;
    name: string;
    phone: string;
    address: string;
    gender: string;
    role: string;
    avatar: File | null;
  };
  setDataUpdateuser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      phone: string;
      address: string;
      gender: string;
      role: string;
      avatar: File | null;
    }>
  >;
};

const FormUpdateUser = ({ dataUpdateUser, setDataUpdateuser }: Props) => {
  const { accountUser } = useSelector((state: RootState) => state.auth);

  const options: OptionType[] = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "LEADER", label: "LEADER" },
    { value: "CODER", label: "CODER" },
    { value: "CUSTOMER", label: "CUSTOMER" },
  ];

  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    options.find((opt) => opt.value === dataUpdateUser.role) || null
  );

  // handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUpdateuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataUpdateuser((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSelectChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    setDataUpdateuser((prev) => ({
      ...prev,
      role: option?.value || "",
    }));
  };

  return (
    <form className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
      <p className="text-2xl font-bold text-cyan-400 mb-1">
        Sửa thông tin người dùng
      </p>
      <p className="text-sm mb-6 text-gray-300">
        Thay thông tin bạn muốn sửa ở form dưới.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Họ tên</label>
          <Input
            name="name"
            className="w-full"
            placeholder="Username..."
            value={dataUpdateUser.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Số điện thoại</label>
          <Input
            name="phone"
            className="w-full"
            placeholder="Phone..."
            value={dataUpdateUser.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-gray-500 text-sm">Address</label>
        <Input
          name="address"
          className="w-full"
          placeholder="Address..."
          value={dataUpdateUser.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Giới tính</label>
          <Input
            name="gender"
            placeholder="Giới tính..."
            value={dataUpdateUser.gender}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Avatar</label>
          <FileInput name="avatar" onChange={handleFileChange} />
        </div>
      </div>

      {accountUser?.role === "ADMIN" && (
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Vai trò</label>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
          />
        </div>
      )}
    </form>
  );
};

export default FormUpdateUser;
