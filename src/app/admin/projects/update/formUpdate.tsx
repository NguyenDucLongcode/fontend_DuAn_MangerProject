import { FileInput } from "@/components/ui/fileInput";
import { Input } from "@/components/ui/input";
import {
  GetGroupDetail,
  GetGroupDevPagination,
} from "@/services/groupDev.services/groupDev.services";
import { GroupDev } from "@/services/groupDev.services/type";
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import Select from "react-select";

type OptionType = { value: string; label: string };
type Props = {
  setDataUpdateProject: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      description: string;
      groupId: string;
      avatar: File | null;
    }>
  >;
  dataUpdateProject: {
    id: string;
    name: string;
    description: string;
    groupId: string;
    avatar: File | null;
  };
};

const FormUpdateProject = ({
  dataUpdateProject,
  setDataUpdateProject,
}: Props) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);
  const [inputGroupName, setInputGroupName] = useState("");
  const [groupOptions, setGroupOptions] = useState<OptionType[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUpdateProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDataUpdateProject((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSelectChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    setDataUpdateProject((prev) => ({
      ...prev,
      groupId: option?.value || "",
    }));
  };

  // Debounced search for groups
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await GetGroupDevPagination({
          limit: 10,
          page: 1,
          name: inputGroupName,
          maxMembers: undefined,
          visibility: undefined,
          fromDate: undefined,
          toDate: undefined,
        });

        const mappedOptions = res.data.groupDevs.map((group: GroupDev) => ({
          label: group.name,
          value: group.id,
        }));

        setGroupOptions(mappedOptions);
      } catch (err) {
        console.error("Lỗi lọc nhóm:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputGroupName]);

  // Load selected group when editing
  useEffect(() => {
    const fetchGroup = async () => {
      if (dataUpdateProject.groupId) {
        try {
          const res = await GetGroupDetail(dataUpdateProject.groupId);
          if (res.statusCode === 200) {
            setSelectedOption({
              value: res.data.groupDev.id,
              label: res.data.groupDev.name,
            });
          }
        } catch (err) {
          console.error("Lỗi lấy thông tin nhóm:", err);
        }
      }
    };

    fetchGroup();
  }, [dataUpdateProject.groupId]);

  return (
    <form className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
      <p className="text-2xl font-bold text-cyan-400 mb-1">Sửa Dự án</p>
      <p className="text-sm mb-6 text-gray-300">
        Điền thông tin bạn muốn tạo ở form phía dưới.
      </p>

      <div className="mb-4">
        <label className="text-gray-500 text-sm">Tên dự án</label>
        <Input
          name="name"
          className="w-full"
          value={dataUpdateProject.name}
          placeholder="Tên nhóm..."
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full">
          <label className="text-gray-500 text-sm">Nhóm dev</label>
          <Select
            placeholder="Chọn nhóm dev..."
            value={selectedOption}
            onChange={handleSelectChange}
            onInputChange={(value) => setInputGroupName(value)}
            options={groupOptions}
            isClearable
            styles={{
              singleValue: (base) => ({ ...base, color: "gray" }),
              option: (base, state) => ({
                ...base,
                color: "gray",
                backgroundColor: state.isFocused ? "#dbeafe" : "white",
                fontWeight: "bold",
                textAlign: "left",
              }),
            }}
          />
        </div>

        <div className="w-full">
          <label className="text-gray-500 text-sm">Avatar</label>
          <FileInput name="avatar" onChange={handleFileChange} />
        </div>
      </div>

      <textarea
        name="description"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
        placeholder="Mô tả..."
        value={dataUpdateProject.description}
        onChange={(e) =>
          setDataUpdateProject((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
    </form>
  );
};

export default FormUpdateProject;
