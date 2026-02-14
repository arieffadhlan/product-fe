import type { LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils/cn";
import { mergeRefs } from "@/utils/ref";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  showError?: boolean;
  icon?: LucideIcon;
  hint?: string;
  className?: string;
  fieldClassName?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      label,
      error,
      min,
      max,
      defaultValue,
      required,
      disabled,
      readOnly,
      icon: Icon,
      type = "text",
      hint,
      showError = true,
      className,
      fieldClassName,
      containerClassName,
      onChange,
      ...props
    },
    forwardedRef
  ) => {
    const reactId = React.useId();
    const inputId = id || `input-${reactId}`;

    const isControlled = value !== undefined;

    const hasError = !!error && showError;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type !== "number") {
        return onChange?.(e);
      }

      const rawValue = e.target.value;
      if (rawValue === "" || rawValue === "-") return onChange?.(e);

      const numValue = parseFloat(rawValue);
      const minLimit = min !== undefined ? Number(min) : -Infinity;
      const maxLimit = max !== undefined ? Number(max) : Infinity;

      if (!isNaN(numValue)) {
        const clampedValue = Math.min(Math.max(numValue, minLimit), maxLimit);
        if (clampedValue !== numValue) {
          e.target.value = clampedValue.toString();
        }
      }

      onChange?.(e);
    };

    const handleChange = type === "number" ? handleNumberChange : onChange;

    React.useEffect(() => {
      const element = inputRef.current;
      if (type !== "number" || !element) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
      };

      element.addEventListener("wheel", handleWheel, { passive: false });
      return () => element.removeEventListener("wheel", handleWheel);
    }, [type]);

    return (
      <div className={cn("flex flex-col w-full gap-y-2", containerClassName)}>
        {label ? (
          <Label htmlFor={inputId}>
            {label}
            {required && <sup className="text-red-500">*</sup>}
          </Label>
        ) : null}
        <div
          className={cn(
            "items-center flex flex-row transition-[border-color] duration-[170ms] ease-linear group focus-within:border-neutral-9 relative w-full h-[46px] gap-x-3 border border-neutral-5 rounded-lg overflow-hidden bg-white",
            hasError && "bg-[#FFFFFF] border-[#FF0000]",
            disabled && "bg-[#D0D3D9] border-[#595959]",
            fieldClassName
          )}
        >
          {Icon ? (
            <Icon
              aria-hidden="true"
              className={cn("absolute left-3 size-5 text-neutral-9", disabled && "text-[#1F1F1F]")}
            />
          ) : null}
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex-1 w-full h-full outline-none text-sm text-neutral-9 placeholder:text-neutral-6 disabled:pointer-events-none disabled:select-none disabled:cursor-not-allowed",
              Icon ? "pl-10 pr-3" : "px-3",
              className
            )}
            value={isControlled ? (value ?? "") : undefined}
            defaultValue={!isControlled ? defaultValue : undefined}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            onChange={handleChange}
            ref={mergeRefs(inputRef, forwardedRef)}
            aria-invalid={hasError}
            {...props}
          />
        </div>
        {!hasError && hint && <p className="text-sm">{hint}</p>}
        {hasError && showError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
