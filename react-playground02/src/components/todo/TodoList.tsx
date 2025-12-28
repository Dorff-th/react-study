import { type Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

type TodoListProp = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

const TodoList = ({ todos, onToggle, onDelete, onUpdate }: TodoListProp) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
