import { Input } from "@/components/ui/input";
import { AccountUser } from "@/services/auth.services/type";
import { GetUserPagination } from "@/services/user.servies/user.services";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select, { SingleValue } from "react-select";

type OptionType = { value: string; label: string };
type Props = {
  setDataCreateSubscription: React.Dispatch<
    React.SetStateAction<{
      userId: string;
      plan: string;
      expiresAt: string;
      price: string;
    }>
  >;
  dataCreateSubscription: {
    userId: string;
    plan: string;
    expiresAt: string;
    price: string;
  };
};

const FormCreateSubscription = ({
  dataCreateSubscription,
  setDataCreateSubscription,
}: Props) => {
  const planOptions: OptionType[] = [
    { value: "FREE", label: "Miễn phí" },
    { value: "BASIC", label: "Cơ bản" },
    { value: "PRO", label: "Nâng cao" },
    { value: "ENTERPRISE", label: "Doanh nghiệp" },
  ];

  const [selectedPlan, setSelectedPlan] =
    useState<SingleValue<OptionType>>(null);
  const [userOptions, setUserOptions] = useState<OptionType[]>([]);
  const [inputUserName, setInputUserName] = useState("");
  const [selectedUser, setSelectedUser] =
    useState<SingleValue<OptionType>>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataCreateSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlanChange = (option: SingleValue<OptionType>) => {
    setSelectedPlan(option);
    setDataCreateSubscription((prev) => ({
      ...prev,
      plan: option?.value || "",
    }));
  };

  const handleUserSelect = (option: SingleValue<OptionType>) => {
    setSelectedUser(option);
    setDataCreateSubscription((prev) => ({
      ...prev,
      userId: option?.value || "",
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setDataCreateSubscription((prev) => ({
      ...prev,
      expiresAt: date?.toISOString() || "",
    }));
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await GetUserPagination({
          limit: 50,
          page: 1,
          name: inputUserName,
          email: undefined,
          role: undefined,
          isActive: true,
          fromDate: undefined,
          toDate: undefined,
        });
        const mapped = res.data.users.map((user: AccountUser) => ({
          label: user.name ?? "Không tên",
          value: user.id,
        }));
        setUserOptions(mapped);
      } catch (err) {
        console.error("Lỗi tìm người dùng:", err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputUserName]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-600">Tạo gói đăng kí</h2>

      <div className="grid md:grid-cols-2 gap-4 z-auto">
        <div>
          <label className="text-sm text-gray-600">Người dùng</label>
          <Select
            placeholder="Chọn người dùng..."
            value={selectedUser}
            onChange={handleUserSelect}
            onInputChange={(value) => setInputUserName(value)}
            options={userOptions}
            isClearable
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Gói đăng kí</label>
          <Select
            placeholder="Chọn gói..."
            value={selectedPlan}
            onChange={handlePlanChange}
            options={planOptions}
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600">Giá gói</label>
          <Input
            type="number"
            name="price"
            placeholder="Nhập giá..."
            value={dataCreateSubscription.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col w-full ">
          <label className="text-sm text-gray-600">Ngày hết hạn</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
          />
        </div>
      </div>
    </div>
  );
};

export default FormCreateSubscription;
