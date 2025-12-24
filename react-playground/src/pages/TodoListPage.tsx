import { useState, useEffect } from "react";
import TodoList from "@/components/todo/TodoList";
import TodoInput from "@/components/todo/TodoInput";
import { type Todo } from "@/types/todo";
import { getTodayDateString } from "@/utils/dateUtils";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useToggleItem } from "@/hooks/useToggleItem";
import { useUI } from "@/hooks/useUI";

const TodoListPage = () => {
  const { showToast } = useUI();

  useEffect(() => {
    showToast("할일 목록 페이지 로딩중!");
  }, []);

  /* ==== state 영역 start ==== */

  // 기본 선택 날짜 = 오늘
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    getTodayDateString()
  );

  const [isAdding, setIsAdding] = useState(false);

  const [todos, setTodos] = useLocalStorageState<Record<string, Todo[]>>(
    "todos",
    {}
  );

  const toggleTodo = useToggleItem(todos, setTodos, selectedDate);

  /* ==== Derived variables / memoized values === */
  // 선택된 날짜의 todo 리스트 계산 (state 아님)
  const todoListForSelectedDate = todos[selectedDate] || [];

  /* ==== 이벤트 핸들러 및 내부 함수 영역 === */
  // 날짜 선택 이벤트 핸들러
  const handleChangeSelectedDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDate(event.target.value);
  };

  //신규 Todo 추가 이벤트 핸들러
  const handleAddTodo = (title: string, selectedDate: string) => {
    if (!title.trim()) return;

    //0) 입력할 데이터 생성
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      date: selectedDate,
    };

    const updated = {
      ...todos,
      [selectedDate]: [...(todos[selectedDate] || []), newTodo],
    };

    setTodos(updated);
  };

  // 기존 Todo 변경 이벤트 핸들러
  const handleModifyTodo = (id: string, title: string) => {
    if (!title.trim()) return;

    // 1) 클릭한 날짜의 리스트만 업데이트
    const updatedList = todoListForSelectedDate.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );

    // 2) 전체 todos 객체에 updatedList 반영
    const updatedTodos = {
      ...todos,
      [selectedDate]: updatedList,
    };

    // 3) 상태 반영 + localStorage 저장
    setTodos(updatedTodos);
    //localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //신규 todo 입력(Input) UI show/hide 토글 이벤트 핸들러
  const handleAddToggle = () => {
    setIsAdding((isAdding) => !isAdding);
  };

  //todo 삭제 이벤트 핸들러
  const handleDeleteTodo = (id: string) => {
    const updatedList = todoListForSelectedDate.filter(
      (todo) => todo.id !== id
    );

    const updated = { ...todos, [selectedDate]: updatedList };

    setTodos(updated);
    //localStorage.setItem("todos", JSON.stringify(updated));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
        <header className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Welcome to TodoList
          </h1>
          <p className="text-lg text-white">
            Manage your tasks efficiently and stay organized!
          </p>
        </header>
        <main className="mt-8 w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Your Todos
          </h2>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleChangeSelectedDate}
            />
          </div>
          <TodoList
            todos={todoListForSelectedDate}
            onToggle={toggleTodo}
            onDelete={handleDeleteTodo}
            onUpdate={handleModifyTodo}
          />
          {isAdding && <TodoInput onAdd={handleAddTodo} />}
        </main>
        <div className="text-center mt-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition 
                  text-white shadow 
                  ${
                    !isAdding
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
            onClick={handleAddToggle}
          >
            {!isAdding ? "Add" : "Cancel"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoListPage;
