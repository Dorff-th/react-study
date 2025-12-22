import { useState } from "react";

const SearchBar = ({
  onKeywordChange,
}: {
  onKeywordChange: (keyword: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mb-5">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onKeywordChange(inputValue);
          }
        }}
        type="text"
        placeholder="제목이나 내용을 검색해보세요..."
        className="
          w-full px-4 py-2.5
          border border-gray-300 rounded-lg
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      />
    </div>
  );
};

export default SearchBar;
