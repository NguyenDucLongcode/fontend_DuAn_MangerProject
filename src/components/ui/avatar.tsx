import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function Avatar({
  src,
  alt = "Avatar",
  size = 40,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden border-2 border-white bg-white shadow-md",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={src || "/avatar/avatar.png"}
        alt={alt}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );
}
