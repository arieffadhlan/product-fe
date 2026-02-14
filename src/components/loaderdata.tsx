import { cn } from "@/utils/cn";
import TableSkeleton from "./table-skeleton";

interface LoaderDataProps {
  data?: any[];
  isLoading: boolean;
  headClassName?: string;
  bodyClassName?: string;
  notFoundClassName?: string;
  colCount?: number;
  rowCount?: number;
}

export default function LoaderData({
  data = [],
  isLoading,
  headClassName,
  bodyClassName,
  notFoundClassName,
  colCount = 10,
  rowCount = 10,
}: LoaderDataProps) {
  if (isLoading) {
    return (
      <TableSkeleton
        colCount={colCount}
        rowCount={rowCount}
        headClassName={headClassName}
        bodyClassName={bodyClassName}
      />
    );
  }

  if (!isLoading && data?.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-12 border border-grey-100 rounded-lg bg-blue-50",
          notFoundClassName
        )}
      >
        <p className="font-[500] text-[24px]">Data not available</p>
      </div>
    );
  }

  return null;
}
