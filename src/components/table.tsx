import { cn } from "@/utils/cn"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

const Table = ({ 
  className, 
  containerClassName,
  ...props 
}: React.ComponentProps<"table"> & {
  className?: string
  containerClassName?: string
}) => {
  return (
    <div className="relative">
      <section className={cn("w-full border border-[#D0D3D9] rounded-lg overflow-x-auto p-0", containerClassName)}>
        <table className={cn("w-full border-collapse border-spacing-0 max-w-none rounded-lg", className)} {...props} />
      </section>
    </div>
  );
}

const THead = ({ className, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead
      data-slot="table-head"
      className={cn("[&_tr]:bg-[#F6F6F6] [&_tr:nth-child(1)]:border-b", className)}
      {...props}
    />
  );
}

const TBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr]:bg-[#FFFFFF] [&_tr:hover]:bg-[#FAFAFA]/90", className)}
      {...props}
    />
  );
}

const Tr = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-rows"
      className={cn("px-4 [&:not(:last-child)]:border-b border-[#D0D3D9] bg-[#FFFFFF]", className)}
      {...props}
    />
  );
}

const Th = ({ className, ...props }: React.ComponentProps<"th">) => {
  return (
    <th
      data-slot="table-head"
      className={cn("px-4 py-3 font-semibold text-left text-sm text-[#1F1F1F] border-[#D0D3D9] whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

const Td = ({ className, ...props }: React.ComponentProps<"td">) => {
  return (
    <td
      data-slot="table-data"
      className={cn("px-4 py-4 font-[400] text-left text-sm text-[#313030] border-[#D0D3D9] whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

const SortableHeader = ({ 
  field, 
  label, 
  sortBy, 
  order, 
  onSort,
  className 
}: { 
  field: string; 
  label: string; 
  sortBy?: string; 
  order?: "asc" | "desc"; 
  className?: string;
  onSort?: (field: string) => void;
}) => {
  const isActive = sortBy === field;
  
  return (
    <Th 
      className={cn(
        "cursor-pointer select-none hover:bg-gray-50 transition-colors",
        className
      )}
      onClick={() => onSort?.(field)}
      title={isActive 
        ? order === "asc" 
          ? "Click to sort descending" 
          : "Click to reset sort"
        : "Click to sort ascending"
      }
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {isActive ? (
          order === "asc" ? (
            <ArrowUp size={16} className="text-blue-600" />
          ) : (
            <ArrowDown size={16} className="text-blue-600" />
          )
        ) : (
          <ArrowUpDown size={16} className="text-gray-400" />
        )}
      </div>
    </Th>
  );
};

export {
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
  SortableHeader,
}
