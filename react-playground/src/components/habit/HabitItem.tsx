import { useState } from "react";
import { type Habit } from "@/types/habit";

type Props = {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

const HabitItem = ({ habit, onToggle, onDelete, onUpdate }: Props) => {
  //수정모드(Edit) 활성화 여부
  const [isEdit, setIsEdit] = useState(false);

  //수정모드 활성화시 input value는 기존 title로 초기화
  const [inputValue, setInputValue] = useState(habit.title);

  //수정모드에서 input value 변경시 실행되는 hanlder
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  return !isEdit ? (
    <div
      className={`
        flex items-center justify-between p-4 border rounded-lg
        transition select-none cursor-pointer
        ${
          habit.completed
            ? "border-purple-500 bg-purple-100 text-purple-700"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }
      `}
    >
      <span className={habit.completed ? " line-through" : ""}>
        {habit.title}
      </span>

      {/* 오른쪽 버튼 묶음 */}
      <div className="flex items-center gap-2">
        {/* 수정 버튼 */}
        <button
          onClick={() => setIsEdit(true)}
          className="border border-blue-500 text-blue-500 px-2 py-1 rounded-md 
               hover:bg-blue-500 hover:text-white transition text-sm"
        >
          ✏️
        </button>
        <button
          onClick={() => onToggle(habit.id)}
          className={`
          w-6 h-6 flex items-center justify-center rounded-full border
          ${
            habit.completed
              ? "border-purple-600 text-purple-600"
              : "border-gray-400 text-gray-400 hover:border-purple-500 hover:text-purple-500"
          }
        `}
        >
          {habit.completed ? "●" : "○"}
        </button>
      </div>
    </div>
  ) : (
    <li
      key={habit.id}
      className="p-4 bg-gray-100 rounded-lg flex items-center justify-between gap-3"
    >
      {/* 입력 필드 */}
      <input
        onChange={handleChangeInputValue}
        value={inputValue}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onUpdate(habit.id, inputValue);
            setIsEdit(false);
          }
        }}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* 오른쪽 버튼 묶음 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onUpdate(habit.id, inputValue);
            setIsEdit(false);
          }}
          className="border border-blue-500 text-blue-500 px-3 py-1 rounded-md 
                 hover:bg-blue-500 hover:text-white transition text-sm flex items-center"
        >
          💾
        </button>

        <button
          onClick={() => setIsEdit(false)}
          className="border border-red-500 text-red-500 px-3 py-1 rounded-md 
                 hover:bg-red-500 hover:text-white transition text-sm flex items-center"
        >
          ❌
        </button>
      </div>
    </li>
  );
};

export default HabitItem;
