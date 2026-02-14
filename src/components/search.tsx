import { SearchIcon } from "lucide-react";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface SearchProps extends ComponentProps<"input"> {
  className?: string;
  containerClassName?: string;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ id, disabled, readOnly, className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row items-center transition-[border-color] duration-[170ms] ease-linear group focus-within:border-neutral-9 relative w-full h-[46px] gap-x-3 border border-neutral-5 rounded-lg overflow-hidden bg-white",
          containerClassName
        )}
      >
        <SearchIcon aria-hidden="true" className="absolute left-3 size-5 text-neutral-9" />
        <input
          id={id}
          inputMode="search"
          className={cn(
            "flex-1 w-full h-full pl-10 pr-3 outline-none text-sm text-neutral-9 placeholder:text-neutral-6 disabled:pointer-events-none disabled:select-none",
            className
          )}
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          aria-disabled={disabled ? true : undefined}
          aria-readonly={readOnly ? true : undefined}
          {...props}
        />
      </div>
    );
  }
);

export { Search };
