import clsx from "clsx";

type paginationProps = {
  startPage: number;
  endPage: number;
  currentPage: number;
  pages: number[];
  hasPrev: boolean;
  hasNext: boolean;
  onActivate: (page: number) => void;
};

const Pagination = ({
  startPage,
  endPage,
  currentPage,
  pages,
  hasPrev,
  hasNext,
  onActivate,
}: paginationProps) => {
  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      {hasPrev && (
        <button
          onClick={() => onActivate(startPage - 1)}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
        >
          ‹
        </button>
      )}

      {pages.map((page) => (
        <button
          onClick={() => onActivate(page)}
          key={page}
          className={clsx(
            currentPage !== page
              ? "px-3 py-1 rounded border text-sm hover:bg-gray-100"
              : "px-3 py-1 rounded border bg-blue-500 text-white text-sm"
          )}
        >
          {page}
        </button>
      ))}

      {hasNext && (
        <button
          onClick={() => onActivate(endPage + 1)}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Pagination;
