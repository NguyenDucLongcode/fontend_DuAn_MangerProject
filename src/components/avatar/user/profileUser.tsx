import { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  //   Github,
  Book,
  LifeBuoy,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarUser from "../avatarUser";

type Props = {
  size?: number; // Truyền vào size tùy chọn
};

const AvatarDropdown = ({ size = 40 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <AvatarUser size={size} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 border text-sm"
          >
            <div className="p-4 font-medium text-gray-700 border-b">
              NguyenDucLongcode
            </div>

            <ul className="py-1 text-gray-800">
              <DropdownItem icon={<User size={16} />} label="Trang cá nhân" />
              <DropdownItem icon={<Star size={16} />} label="Yêu thích" />
            </ul>

            <hr className="border-t" />

            <ul className="py-1 text-gray-800">
              <DropdownItem icon={<Book size={16} />} label="Tài liệu" />
              <DropdownItem icon={<LifeBuoy size={16} />} label="Hỗ trợ" />
            </ul>

            <hr className="border-t" />

            <ul className="py-1 text-gray-800">
              <DropdownItem icon={<Settings size={16} />} label="Cài đặt" />
              <DropdownItem icon={<LogOut size={16} />} label="Đăng xuất" />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
    {icon}
    <span>{label}</span>
  </li>
);

export default AvatarDropdown;
