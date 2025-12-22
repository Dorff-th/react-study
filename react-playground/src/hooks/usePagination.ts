type UsePaginationParams = {
  currentPage: number;
  totalPages: number;
  blockSize: number; // 한 화면에 보여줄 페이지 버튼 개수
};

export function usePagination({
  currentPage,
  totalPages,
  blockSize,
}: UsePaginationParams) {
  const safeBlockSize = Math.max(blockSize, 1);

  const tempEnd =
    Math.ceil(currentPage / safeBlockSize) * safeBlockSize;

  const startPage = Math.max(1, tempEnd - (safeBlockSize - 1));
  const endPage = Math.min(tempEnd, totalPages);

  const hasPrev = startPage > 1;
  const hasNext = endPage < totalPages;

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return {
    startPage,
    endPage,
    pages,
    hasPrev,
    hasNext,
  };
}
