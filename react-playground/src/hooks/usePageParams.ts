import { useSearchParams } from "react-router-dom";

type PageParamsOptions = {
  defaultPage?: number;
  defaultSize?: number;
  maxSize?: number;
};

export function usePageParams(options?: PageParamsOptions) {
  const [searchParams] = useSearchParams();

  const {
    defaultPage = 1,
    defaultSize = 5,
    maxSize = 50,
  } = options || {};

  const rawPage = Number(searchParams.get("page"));
  const rawSize = Number(searchParams.get("size"));

  const page =
    Number.isInteger(rawPage) && rawPage > 0
      ? rawPage
      : defaultPage;

  let size =
    Number.isInteger(rawSize) && rawSize > 0
      ? rawSize
      : defaultSize;

  if (size > maxSize) {
    size = maxSize;
  }

  return { page, size };
}
