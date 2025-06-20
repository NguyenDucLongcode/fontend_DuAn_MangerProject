import { FileInput } from "@/components/ui/fileInput";
import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/redux/store";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SingleValue } from "react-select";
import Select from "react-select";

type OptionType = { value: string; label: string };
type Props = {
  setDataCreateUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      email: string;
      address: string;
      password: string;
      gender: string;
      role: string;
      avatar: File | null;
    }>
  >;
  dataCreateUser: {
    name: string;
    phone: string;
    email: string;
    address: string;
    password: string;
    gender: string;
    role: string;
    avatar: File | null;
  };
};

const FormCreateUser = ({ dataCreateUser, setDataCreateUser }: Props) => {
  const { accountUser } = useSelector((state: RootState) => state.auth);

  //selection
  const options: OptionType[] = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "LEADER", label: "LEADER" },
    { value: "CODER", label: "CODER" },
    { value: "CUSTOMER", label: "CUSTOMER" },
  ];
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    { value: "CUSTOMER", label: "CUSTOMER" }
  );

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false); //show icon password

  // handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataCreateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataCreateUser((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSelectChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    setDataCreateUser((prev) => ({
      ...prev,
      role: option?.value || "",
    }));
  };

  return (
    <form className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
      <p className="text-2xl font-bold text-cyan-400 mb-1">Tạo người dùng</p>
      <p className="text-sm mb-6 text-gray-300">
        Điền thông tin bạn muốn tạo ở form phía dưới.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Email</label>
          <Input
            name="email"
            className="w-full"
            value={dataCreateUser.email}
            placeholder="Email..."
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-1/2 relative">
          <label className="text-gray-500 text-sm">Password</label>
          <Input
            name="password"
            type={isShowPassword ? "text" : "password"}
            placeholder="Password..."
            value={dataCreateUser.password}
            onChange={handleInputChange}
            className="pr-12" // chừa chỗ cho icon
          />
          <button
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="absolute bottom-2.5 right-4 flex items-center text-gray-500 hover:text-blue-500"
          >
            {isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Địa chỉ</label>
          <Input
            name="address"
            className="w-full"
            placeholder="Địa chỉ..."
            value={dataCreateUser.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Họ tên</label>
          <Input
            name="name"
            className="w-full"
            placeholder="Họ tên..."
            value={dataCreateUser.name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Giới tính</label>
          <Input
            name="gender"
            placeholder="Giới tính..."
            onChange={handleInputChange}
            value={dataCreateUser.gender}
          />
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Số điện thoại</label>
          <Input
            name="phone"
            className="w-full"
            placeholder="Số điện thoại..."
            value={dataCreateUser.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Avatar</label>
          <FileInput name="avatar" onChange={handleFileChange} />
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
      </div>
    </form>
  );
};

export default FormCreateUser;
