import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const variantClasses = {
  disable: "text-[#595959] bg-[#F0F1F3]",
  default: "text-black bg-[#FFFFFF] border border-neutral-5",
  outline: "border border-neutral-5 bg-[#FFFFFF] hover:bg-neutral-4/40 active:bg-neutral-5/50",
  dangers: "text-white bg-[#FF0000] hover:bg-[#E80000] active:bg-[#B50000]",
  primary: "text-white bg-[#2866C8] hover:bg-[#245DB6] active:bg-[#1C488E]",
  success: "text-white bg-[#12B569] hover:bg-[#10A560] active:bg-[#0D814B]",
  warning: "text-white bg-[#F79009] hover:bg-[#E18308] active:bg-[#AF6606]",
} as const;

const sizeClasses = {
  sm: "h-[36px] text-[14px] rounded-md px-[12px] py-2",
  md: "h-[40px] text-[14px] rounded-lg px-[14px] py-[10px]",
  lg: "h-[46px] text-[14px] rounded-lg px-[16px] py-[10px]",
  xl: "h-[48px] text-[16px] rounded-lg px-[18px] py-[12px]",
  iconXs: "size-[32px] rounded-md",
  iconSm: "size-[36px] rounded-md",
  iconMd: "size-[40px] rounded-md",
  iconLg: "size-[44px] rounded-lg",
  iconXl: "size-[48px] rounded-lg",
} as const;

type ButtonSize = keyof typeof sizeClasses;
type ButtonVariant = keyof typeof variantClasses;

type ButtonProps = React.ComponentProps<"button"> & {
  load?: boolean;
  text?: React.ReactNode;
  icon?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  asChild?: boolean;
  fullWidth?: boolean;
};

const Button = ({
  icon,
  text,
  size = "lg",
  load = false,
  asChild = false,
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "flex items-center justify-center gap-2 w-fit whitespace-nowrap transition-colors font-[500] cursor-pointer [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 ease-linear text-sm",
        "disabled:border-0 disabled:bg-grey-100 disabled:text-neutral-7 disabled:pointer-events-none disabled:[&_svg]:text-neutral-7",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {load ? (
        <Loader2 className="w-5 h-5 animate-spin text-white" />
      ) : children ? (
        children
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </Comp>
  );
};

export { Button };
