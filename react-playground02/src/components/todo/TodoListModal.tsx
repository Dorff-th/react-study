import { type Todo } from "@/types/todo";

type TodoListModalProps = {
  date: string;
  todos: Todo[];
  onClose: () => void;
};

const TodoListModal = ({ date, todos, onClose }: TodoListModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-xl relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{date} Todo List</h2>

        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">할 일이 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((t) => (
              <li
                key={t.id}
                className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <span className={t.completed ? "line-through" : ""}>
                  {t.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 배경 클릭시 닫기 */}
      <div className="absolute inset-0" onClick={onClose}></div>
    </div>
  );
};

export default TodoListModal;
