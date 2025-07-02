import { Avatar } from "@/components/ui/avatar";
import { RootState } from "@/lib/redux/store";
import { AccountUser } from "@/services/auth.services/type";
import { GetUserPagination } from "@/services/user.servies/user.services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SingleValue } from "react-select";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setInforUser } from "@/lib/redux/slices/user/reducer";
import {
  setDetailGroupId,
  setShowAvatarDetail,
} from "@/lib/redux/slices/modal/action";
import UserDetailAvatar from "@/components/avatar/user/detailUser";
import ModalDeleteLeader from "./modalDelete";

type OptionType = { value: string; label: string };
type Props = {
  setSelectionLeader: React.Dispatch<React.SetStateAction<string>>;

  onRefresh: () => void;
};

const FormDetailLeader = ({ setSelectionLeader, onRefresh }: Props) => {
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);
  const [inputUserName, setInputUserName] = useState("");
  const [userOptions, setUserOptions] = useState<OptionType[]>([]);

  const inforGroup = useSelector(
    (state: RootState) => state.groupDev.inforGroup
  );

  const handleSelectChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };

  // Debounced search for groups
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await GetUserPagination({
          limit: 10,
          page: 1,
          name: inputUserName,
          email: undefined,
          role: "LEADER",
          isActive: true,
          fromDate: undefined,
          toDate: undefined,
        });

        const mappedOptions: OptionType[] = res.data.users.map(
          (user: AccountUser) => ({
            label: user.name ?? "Không tên",
            value: user.id,
          })
        );

        setUserOptions(mappedOptions);
      } catch (err) {
        console.error("Lỗi lọc người dùng:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputUserName]);

  useEffect(() => {
    if (selectedOption?.value) {
      setSelectionLeader(selectedOption.value);
    } else {
      setSelectionLeader(""); // Clear nếu không có gì được chọn
    }
  }, [selectedOption, setSelectionLeader]);

  return (
    <form className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
      <p className="text-2xl font-bold text-cyan-400 mb-1">
        Thông tin trưởng nhóm
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="text-gray-500 text-sm">Đổi trưởng nhóm</label>
          <Select
            placeholder="Chọn người dùng..."
            value={selectedOption}
            onChange={handleSelectChange}
            onInputChange={(value) => setInputUserName(value)}
            options={userOptions}
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
      </div>

      {/* detail leader */}
      {!inforGroup?.leader ? (
        <>
          <p>Không có trưởng nhóm</p>
        </>
      ) : (
        <div className="space-y-4 max-h-[355px]  pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 gap-4">
              {/* Left side: Avatar + Name */}
              <div className="flex items-center space-x-4">
                <Avatar
                  src={inforGroup.leader.avatar_url || "/avatar/avatar.png"}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <p className="text-gray-800 font-medium">
                  {inforGroup.leader.name ?? "Không tên"}
                </p>
              </div>

              {/* Right side: Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-blue-500 border-blue-500 hover:bg-blue-50"
                  onClick={() => {
                    if (inforGroup.leader) {
                      dispatch(setInforUser(inforGroup.leader)); // <--- Lưu thông tin user vào Redux
                      dispatch(setShowAvatarDetail.DetailAvatar(true)); // <--- Mở modal
                    }
                  }}
                >
                  <Eye className="text-sm" />
                  Xem
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => {
                    if (inforGroup.leader) {
                      dispatch(setInforUser(inforGroup.leader)); // <--- Lưu thông tin user vào Redux
                      dispatch(setDetailGroupId.deleteMember(true)); // <--- Mở modal
                    }
                  }}
                >
                  <Trash2 className="text-sm" />
                  Xóa
                </Button>
              </div>
            </div>
          }
        </div>
      )}
      {/* modal show detail user */}
      <UserDetailAvatar />
      {/* modal delete */}
      <ModalDeleteLeader onRefresh={onRefresh} />
    </form>
  );
};

export default FormDetailLeader;
