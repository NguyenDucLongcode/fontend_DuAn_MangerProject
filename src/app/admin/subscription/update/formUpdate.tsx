import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/redux/store";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { SingleValue } from "react-select";
import Select from "react-select";

// Kiểu option chung cho các select
type OptionType = { value: string; label: string };

// Props cho component
type Props = {
  setDataUpdateSubscription: React.Dispatch<
    React.SetStateAction<{
      id: string;
      userId: string;
      plan: string;
      expiresAt: string;
      price: string;
    }>
  >;
  dataUpdateSubscription: {
    id: string;
    userId: string;
    plan: string;
    expiresAt: string;
    price: string;
  };
};

const FormUpdateSubscription = ({
  dataUpdateSubscription,
  setDataUpdateSubscription,
}: Props) => {
  // Gói đăng ký có sẵn - ghi nhớ bằng useMemo để không bị tạo lại mỗi render
  const planOptions: OptionType[] = useMemo(
    () => [
      { value: "FREE", label: "Miễn phí" },
      { value: "BASIC", label: "Cơ bản" },
      { value: "PRO", label: "Nâng cao" },
      { value: "ENTERPRISE", label: "Doanh nghiệp" },
    ],
    []
  );

  const { inforSubScription } = useSelector(
    (state: RootState) => state.subscription
  );

  // State đang chọn cho gói và ngày hết hạn
  const [selectedPlan, setSelectedPlan] =
    useState<SingleValue<OptionType>>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  // Xử lý khi chọn ngày hết hạn
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setDataUpdateSubscription((prev) => ({
      ...prev,
      expiresAt: date?.toISOString() || "",
    }));
  };

  // Xử lý thay đổi input giá
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUpdateSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý chọn gói từ select
  const handlePlanChange = (option: SingleValue<OptionType>) => {
    setSelectedPlan(option);
    setDataUpdateSubscription((prev) => ({
      ...prev,
      plan: option?.value || "",
    }));
  };

  // Đồng bộ selectedPlan và startDate từ props (dữ liệu đã có sẵn)
  useEffect(() => {
    // Gán lại selected plan
    if (dataUpdateSubscription.plan) {
      const matchedPlan = planOptions.find(
        (option) => option.value === dataUpdateSubscription.plan
      );
      setSelectedPlan(matchedPlan || null);
    }

    // Gán lại ngày hết hạn (convert từ ISO string)
    if (dataUpdateSubscription.expiresAt) {
      setStartDate(new Date(dataUpdateSubscription.expiresAt));
    }
  }, [dataUpdateSubscription, planOptions]);

  return (
    <form className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
      {/* Tiêu đề form */}
      <p className="text-2xl font-bold text-cyan-400 mb-1">
        Sửa gói của {inforSubScription?.user.name}
      </p>
      <p className="text-sm mb-6 text-gray-300">
        Điền thông tin bạn muốn tạo ở form phía dưới.
      </p>

      {/* Chọn gói đăng ký */}
      <div>
        <label className="text-sm text-gray-600">Gói đăng kí</label>
        <Select
          placeholder="Chọn gói..."
          value={selectedPlan}
          onChange={handlePlanChange}
          options={planOptions}
        />
      </div>

      {/* Nhập giá gói */}
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Giá gói</label>
        <Input
          type="number"
          name="price"
          placeholder="Nhập giá..."
          value={dataUpdateSubscription.price}
          onChange={handleInputChange}
        />
      </div>

      {/* Chọn ngày hết hạn */}
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Ngày hết hạn</label>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          dateFormat="dd/MM/yyyy"
          value={dataUpdateSubscription.expiresAt}
          placeholderText="Chọn ngày"
        />
      </div>
    </form>
  );
};

export default FormUpdateSubscription;
