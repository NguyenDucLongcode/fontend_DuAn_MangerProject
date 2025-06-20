import * as React from "react";
import { cn } from "@/lib/utils";

function FileInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="file"
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400",
        "file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium",
        className // đảm bảo className sau cùng để override
      )}
      {...props}
    />
  );
}

export { FileInput };
