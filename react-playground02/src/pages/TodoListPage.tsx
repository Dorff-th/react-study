import { useState, useEffect } from "react";
import TodoList from "@/components/todo/TodoList";
import TodoInput from "@/components/todo/TodoInput";
import { type Todo } from "@/types/todo";
import { getTodayDateString } from "@/utils/dateUtils";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useToggleItem } from "@/hooks/useToggleItem";
import { useUI } from "@/hooks/useUI";
import { createAddTodoAction } from "@/actions/addTodoAction";
import { useAction } from "@/contexts/ActionContext";
import { ActionLogModal } from "@/components/todo/ActionLogModal";

const TodoListPage = () => {
  /* ==== state 영역  ==== */

  // 기본 선택 날짜 = 오늘
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    getTodayDateString()
  );

  //할일 추가 input  hide/show state
  const [isAdding, setIsAdding] = useState(false);

  //ActionLogPanel hide/show state
  const [isLogOpen, setIsLogOpen] = useState(false);

  /* ==== hook 영역 ==== */
  const [todos, setTodos] = useLocalStorageState<Record<string, Todo[]>>(
    "todos",
    {}
  );

  const { showToast } = useUI();
  const toggleTodo = useToggleItem(todos, setTodos, selectedDate);
  const { dispatch, undoLastAction, actionLogs } = useAction();

  /* ==== Derived variables / memoized values === */
  // 선택된 날짜의 todo 리스트 계산 (state 아님)
  const todoListForSelectedDate = todos[selectedDate] || [];

  /* ==== useEffect 영역 start ==== */
  useEffect(() => {
    showToast("할일 목록 페이지 로딩중!");
  }, []);

  /* ==== 이벤트 핸들러 및 내부 함수 영역 === */
  // 날짜 선택 이벤트 핸들러
  const handleChangeSelectedDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDate(event.target.value);
  };

  const handleAddTodoClick = (title: string, selectedDate: string) => {
    if (!title.trim()) return;

    const action = createAddTodoAction(title, selectedDate, setTodos);
    dispatch(action);
  };

  const handleUndoClick = () => {
    undoLastAction();
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
  };

  //action log ui open/close toggle handler
  const handleToggleLog = () => {
    setIsLogOpen((prev) => !prev);
  };

  //action log log ui close handler
  const handleCloseLog = () => {
    setIsLogOpen(false);
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
          {isAdding && <TodoInput onAdd={handleAddTodoClick} />}
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
          {actionLogs.length > 0 ? (
            <button
              onClick={handleUndoClick}
              className="px-6 py-2 rounded-lg font-semibold transition bg-orange-400 hover:bg-orange-500"
            >
              Undo
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="mb-4 text-2xl font-semibold text-gray-800 px-6 py-2 rounded-lg  transition bg-purple-400 hover:bg-purple-500">
          <button
            onClick={handleToggleLog}
            className="mb-4 px-6 py-2 text-lg font-semibold rounded-lg transition
             bg-purple-400 hover:bg-purple-500 text-white"
          >
            {isLogOpen ? "Hide Action Log" : "Show Action Log"}
          </button>
        </div>
        {isLogOpen && <ActionLogModal onClose={handleCloseLog} />}
      </div>
    </>
  );
};

export default TodoListPage;
