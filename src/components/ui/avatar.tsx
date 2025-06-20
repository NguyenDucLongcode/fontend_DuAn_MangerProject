"use client";

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
        "rounded-full overflow-hidden border-2 border-gray-300 shadow-sm",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={src || "/public/avatar/avatar.png"}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
        priority
      />
    </div>
  );
}
