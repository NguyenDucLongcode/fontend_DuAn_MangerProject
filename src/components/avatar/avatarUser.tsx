import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { Avatar } from "../ui/avatar";

type Props = {
  size?: number; // Truyền vào size tùy chọn
};
const AvatarUser = ({ size = 40 }: Props) => {
  const { accountUser } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <Avatar
        src={accountUser?.avatar_url || "/avatar/avatar.png"}
        size={size}
      />
    </div>
  );
};
export default AvatarUser;
