import { useState } from "react";
import { type Todo } from "@/types/todo";
import clsx from "clsx";

type TodoItemProp = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProp) => {
  //수정모드(Edit) 활성화 여부
  const [isEdit, setIsEdit] = useState(false);

  //수정모드 활성화시 input value는 기존 title로 초기화
  const [inputValue, setInputValue] = useState(todo.title);

  //수정모드에서 input value 변경시 실행되는 hanlder
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  return !isEdit ? (
    <li
      key={todo.id}
      className="p-4 bg-gray-100 rounded-lg text-left flex items-center justify-between"
    >
      {/* 왼쪽 영역 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={clsx(todo.completed ? "line-through text-gray-500" : "")}
        >
          {todo.title}
        </span>
      </div>

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

        {/* 오른쪽 X 버튼 */}
        <button
          onClick={() => onDelete(todo.id)}
          className="border border-red-500 text-red-500 px-2 py-1 rounded-md 
               hover:bg-red-500 hover:text-white transition text-sm"
        >
          X
        </button>
      </div>
    </li>
  ) : (
    <li
      key={todo.id}
      className="p-4 bg-gray-100 rounded-lg flex items-center justify-between gap-3"
    >
      {/* 입력 필드 */}
      <input
        onChange={handleChangeInputValue}
        value={inputValue}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onUpdate(todo.id, inputValue);
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
            onUpdate(todo.id, inputValue);
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

export default TodoItem;
