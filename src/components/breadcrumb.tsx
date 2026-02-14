import { cn } from "@/utils/cn";
import {Slot} from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

const BreadcrumbRoot = ({ className, ...props }: React.ComponentProps<"nav">) => {
  return (
    <nav 
      data-slot="breadcrumb"
      className={className}
      {...props} 
    />
  );
};

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-2 text-sm break-words", className)}
      {...props}
      />
    );
  };
  
  const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => {
    return (
    <li
      data-slot="breadcrumb-item"
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
};

const BreadcrumbLink = ({ className, asChild, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("ease-linear transition-colors leading-none", className)}
      {...props}
    />
  );
};

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="breadcrumb-page"
      className={cn("leading-[1]", className)}
      {...props}
    />
  );
};

const BreadcrumbMore = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="breadcrumb-more"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};

const BreadcrumbSeparator = ({ className, children, ...props }: React.ComponentProps<"li">) => {
  return (
    <li
      data-slot="breadcrumb-icon"
      className={cn("[&>svg]:size-4", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

export {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbMore,
  BreadcrumbSeparator,
}