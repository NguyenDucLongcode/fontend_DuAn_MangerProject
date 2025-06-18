import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Style tương đương với .input
        "h-[40px] max-w-[190px] px-[0.875rem] py-[0.875rem] text-base border border-[1.5px] border-black rounded-[0.5rem]",
        "shadow-[2.5px_3px_0_#000] outline-none transition ease-linear",
        "focus:shadow-[5.5px_7px_0_black]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
