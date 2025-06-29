import { motion } from "framer-motion";
import Image from "next/image";

export function CardFlip({
  title,
  description,
  imageSrc,
  onClick,
}: {
  title: string;
  description: string;
  imageSrc: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full sm:w-[250px] h-[220px] bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full h-32 relative">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
