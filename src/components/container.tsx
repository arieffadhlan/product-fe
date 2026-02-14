import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        `flex flex-col gap-4 px-4 py-6 rounded-xl bg-white shadow-[0px_1.75px_4px_-1px_#0F11141A] sm:p-6`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";

export default Container;
