import { Eye, EyeOff, Lock } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Label } from "./label";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  showError?: boolean;
  hint?: string;
  className?: string;
  fieldClassName?: string;
  containerClassName?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      id,
      label,
      error,
      required,
      disabled,
      readOnly,
      hint,
      showError = true,
      className = "",
      fieldClassName = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    const [show, setShow] = React.useState(true);
    const elemenId = id || `input-password-${React.useId()}`;
    const hasError = error;

    return (
      <div className={cn("flex flex-col w-full gap-y-2", containerClassName)}>
        {label ? (
          <Label htmlFor={id}>
            {label}
            {required && <sup className="text-red-500">*</sup>}
          </Label>
        ) : null}
        <div
          className={cn(
            "items-center md flex flex-row transition-[border-color] duration-[170ms] ease-linear group focus-within:border-neutral-9 relative w-full h-[46px] gap-x-3 border border-neutral-5 rounded-lg overflow-hidden bg-white disabled:cursor-not-allowed",
            hasError && "bg-[#FFFFFF] border-[#FF0000]",
            disabled && "bg-[#D0D3D9] border-[#595959]",
            fieldClassName
          )}
        >
          <Lock aria-hidden="true" className="absolute left-3 size-5 text-neutral-9" />
          <input
            id={elemenId}
            type={show ? "password" : "text"}
            inputMode="text"
            className={cn(
              "flex-1 w-full h-full pl-10 pr-10 outline-none text-sm text-neutral-9 placeholder:text-neutral-6 disabled:pointer-events-none disabled:select-none",
              className
            )}
            ref={ref}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            aria-disabled={disabled ? true : undefined}
            aria-required={required ? true : undefined}
            aria-readonly={readOnly ? true : undefined}
            aria-invalid={hasError ? true : undefined}
            {...props}
          />
          <button
            onClick={() => setShow((prev) => !prev)}
            type="button"
            className="absolute right-3"
            aria-label={show ? "Show password" : "Hide password"}
            tabIndex={0}
          >
            {!show ? <Eye className="size-5 text-neutral-9" /> : <EyeOff className="size-5 text-neutral-9" />}
          </button>
        </div>
        {!hasError && hint && <p className="text-sm">{hint}</p>}
        {hasError && showError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export { InputPassword };
