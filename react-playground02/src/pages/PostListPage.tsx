import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { usePageParams } from "@/hooks/usePageParams";
import { usePagination } from "@/hooks/usePagination";
import SearchBar from "@/components/post/SearchBar";
import FilterBar from "@/components/post/FilterBar";
import PostList from "@/components/post/PostList";
import Pagination from "@/components/post/Pagination";
import { type Filter } from "@/types/filter";

const PostListPage = () => {
  //const [keyword, setKeyword] = useState("");
  //const [category, setCategory] = useState("");

  const [filter, setFilter] = useState<Filter | null>(null);

  const { page, size } = usePageParams();
  //const { totalCount, posts } = usePosts(page, size, keyword);
  const { totalCount, posts } = usePosts(page, size, filter ?? {});
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPage = Math.ceil(totalCount / size);

  const BLOCK_SIZE = 4;

  const { startPage, endPage, pages, hasPrev, hasNext } = usePagination({
    currentPage: page,
    totalPages: totalPage,
    blockSize: BLOCK_SIZE,
  });

  // 검색 키워드 핸들러
  const handleKeywordChange = (keyword: string) => {
    //setKeyword(keyword);
    setFilter((prev) => ({ ...(prev ?? {}), keyword }));
  };

  // category 콤보박스 선택 핸들러
  const handleCategoryChange = (category: string) => {
    setFilter((prev) => ({ ...(prev ?? {}), category }));
  };

  //completed toggle (콤보박스) 핸들러
  const handleToggleCompleted = (completed: boolean | undefined) => {
    setFilter((prev) => ({ ...(prev ?? {}), isCompleted: completed }));
  };

  // 페이지 이동(change) 핸들러
  const handlePageChange = (nextPage: number) => {
    setSearchParams({
      page: String(nextPage),
      size: String(size),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">📋 Post Board</h1>
          <p className="text-gray-500 mt-1">
            페이징 + 검색 + 필터 실습용 게시판
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <SearchBar onKeywordChange={handleKeywordChange} />
          <FilterBar
            totalCount={totalCount}
            onCategoryChange={handleCategoryChange}
            onIsCompletedChange={handleToggleCompleted}
          />
          <PostList posts={posts || []} />
          <Pagination
            startPage={startPage}
            endPage={endPage}
            currentPage={page}
            pages={pages}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onActivate={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
