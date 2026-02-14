import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { IPaginationProps } from "@/types/pagination";
import { getAllQueryParams } from "@/utils/url";

interface PaginationProps {
  data?: IPaginationProps;
  loading?: boolean;
}

const PaginationButton = ({
  icon,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="cursor-pointer flex items-center justify-center w-8 h-8 border border-neutral-5 rounded-md bg-white disabled:cursor-not-allowed"
  >
    {icon}
  </button>
);

export default function Pagination({ data, loading }: PaginationProps) {
  const allParams = getAllQueryParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!allParams.skip) searchParams.set("skip", "0");
    if (!allParams.limit) searchParams.set("limit", "10");
    if (!allParams.skip || !allParams.limit) {
      setSearchParams(searchParams);
    }
  }, [allParams, searchParams]);

  const paginationInfo = useMemo(() => {
    if (!data) return null;

    const { total, skip, limit } = data;
    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const hasPrev = skip > 0;
    const hasNext = skip + limit < total;
    const prevSkip = hasPrev ? Math.max(0, skip - limit) : null;
    const nextSkip = hasNext ? skip + limit : null;

    return { page: currentPage, totalPages, hasPrev, hasNext, prevSkip, nextSkip, limit };
  }, [data]);

  if (loading || !paginationInfo || paginationInfo.totalPages === 0) return null;

  const { page, totalPages, hasPrev, hasNext, prevSkip, nextSkip, limit } = paginationInfo;

  const handleUpdateSkip = (skip: number) => setSearchParams({ ...allParams, skip: String(skip) });
  const handleUpdateLimit = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchParams({ ...allParams, skip: "0", limit: e.target.value });

  return (
    <div className="flex flex-row items-center justify-end gap-8 w-full">
      <div className="font-[500] text-sm">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center gap-3">
        <p className="font-[500] text-sm">Rows per page</p>
        <select
          data-slot="rows-per-page"
          className="border border-neutral-5 bg-white p-2 outline-none rounded-lg text-sm"
          value={allParams.limit}
          onChange={handleUpdateLimit}
        >
          {[1, 5, 10, 25, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <PaginationButton
          disabled={!hasPrev}
          onClick={() => handleUpdateSkip(0)}
          icon={<ChevronsLeft size={18} color={hasPrev ? "#1F1F1F" : "#8C8C8C"} />}
        />
        <PaginationButton
          disabled={!hasPrev}
          onClick={() => prevSkip !== null && handleUpdateSkip(prevSkip)}
          icon={<ChevronLeft size={18} color={hasPrev ? "#1F1F1F" : "#8C8C8C"} />}
        />
        <PaginationButton
          disabled={!hasNext}
          onClick={() => nextSkip !== null && handleUpdateSkip(nextSkip)}
          icon={<ChevronRight size={18} color={hasNext ? "#1F1F1F" : "#8C8C8C"} />}
        />
        <PaginationButton
          disabled={!hasNext}
          onClick={() => handleUpdateSkip((totalPages - 1) * limit)}
          icon={<ChevronsRight size={18} color={hasNext ? "#1F1F1F" : "#8C8C8C"} />}
        />
      </div>
    </div>
  );
}
