type FilterBarProps = {
  totalCount: number;
  onCategoryChange: (category: string) => void;
  onIsCompletedChange: (value: boolean | undefined) => void;
};

const FilterBar = ({
  totalCount,
  onCategoryChange,
  onIsCompletedChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        onChange={(event) => onCategoryChange(event.target.value)}
        className="
          px-3 py-2 rounded-lg border border-gray-300
          text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="">전체 카테고리</option>
        <option value="DIARY">DIARY</option>
        <option value="TODO">TODO</option>
        <option value="HABIT">HABIT</option>
      </select>

      <select
        onChange={(event) => {
          const value = event.target.value;
          onIsCompletedChange(
            value === "1" ? true : value === "0" ? false : undefined
          );
        }}
        className="
          px-3 py-2 rounded-lg border border-gray-300
          text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option>전체 상태</option>
        <option value={1}>완료</option>
        <option value={0}>미완료</option>
      </select>

      <div className="ml-auto text-sm text-gray-400 self-center">
        총 {totalCount}개 항목
      </div>
    </div>
  );
};

export default FilterBar;
