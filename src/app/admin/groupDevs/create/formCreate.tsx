import { FileInput } from "@/components/ui/fileInput";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SingleValue } from "react-select";
import Select from "react-select";

type OptionType = { value: string; label: string };
type Props = {
  setDataCreateGroup: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      visibility: string;
      maxMembers: string;
      avatar: File | null;
    }>
  >;
  dataCreateGroup: {
    name: string;
    description: string;
    visibility: string;
    maxMembers: string;
    avatar: File | null;
  };
};

const FormCreateGroup = ({ dataCreateGroup, setDataCreateGroup }: Props) => {
  //selection
  const options: OptionType[] = [
    { value: "PRIVATE", label: "PRIVATE" },
    { value: "PUBLIC", label: "PUBLIC" },
    { value: "RESTRICTED", label: "RESTRICTED" },
  ];
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    { value: "PUBLIC", label: "PUBLIC" }
  );

  // handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataCreateGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataCreateGroup((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSelectChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    setDataCreateGroup((prev) => ({
      ...prev,
      role: option?.value || "",
    }));
  };

  return (
    <form className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
      <p className="text-2xl font-bold text-cyan-400 mb-1">Tạo nhóm develop</p>
      <p className="text-sm mb-6 text-gray-300">
        Điền thông tin bạn muốn tạo ở form phía dưới.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Tên nhóm</label>
          <Input
            name="name"
            className="w-full"
            value={dataCreateGroup.name}
            placeholder="Tên nhóm..."
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Số thành viên</label>
          <Input
            type="number"
            name="maxMembers"
            className="w-full"
            placeholder="Số thành viên..."
            value={dataCreateGroup.maxMembers}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Hiển thị</label>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <label className="text-gray-500 text-sm">Avatar</label>
          <FileInput name="avatar" onChange={handleFileChange} />
        </div>
      </div>

      <textarea
        name="description"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
        placeholder="Mô tả..."
        value={dataCreateGroup.description}
        onChange={(e) =>
          setDataCreateGroup((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
    </form>
  );
};

export default FormCreateGroup;
