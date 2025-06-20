import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[40px] px-[0.875rem] py-[0.875rem] text-base  border-[1.5px] border-black rounded-[0.5rem]",
        "shadow-[2.5px_3px_0_#000] outline-none transition ease-linear",
        "focus:shadow-[5.5px_7px_0_black]",
        className // đảm bảo className sau cùng để override
      )}
      {...props}
    />
  );
}

export { Input };
