import { cn } from "@/utils/cn";

export default function FilterData({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 w-full p-2 rounded-xl bg-[#F0F1F3] overflow-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
