import { useState } from "react";
import { getTodayDateString } from "@/utils/dateUtils";

const TodoInput = ({
  onAdd,
}: {
  onAdd: (title: string, selectedDate: string) => void;
}) => {
  //할일 제목 입력 state 초기값은 ""
  const [inputValue, setInputValue] = useState("");

  //날짜 입력(날짜 선택) state 초기값은 현재시간의 "YYYY-MM-DD"
  const [inputDate, setInputDate] = useState<string>(getTodayDateString);

  //할일 제목 입력 이벤트 핸들러
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  //날짜 입력 이벤트 핸들러
  const handleChangeInputDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputDate(event.target.value);
  };

  return (
    <div className="mt-6 text-center space-y-4">
      {/* 날짜 + 입력칸 가로 배치 */}
      <div className="flex items-center gap-3">
        <input
          type="date"
          value={inputDate}
          onChange={handleChangeInputDate}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="새 할 일을 입력하세요..."
          onChange={handleChangeInputValue}
          value={inputValue}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onAdd(inputValue, inputDate);
              setInputValue("");
            }
          }}
        />
      </div>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition"
        onClick={() => {
          onAdd(inputValue, inputDate);
          setInputValue("");
        }}
      >
        Add New Todo
      </button>
    </div>
  );
};

export default TodoInput;
