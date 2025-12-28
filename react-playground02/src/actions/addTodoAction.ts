import { type Action } from "@/types/action";
import {  type TodosByDate, type Todo } from "@/types/todo";

export function createAddTodoAction(
  title: string,
  date: string,
  setTodos: React.Dispatch<React.SetStateAction<TodosByDate>>
): Action {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    date,
  };

  return {
    type: "ADD_TODO",
    payload: newTodo,

    do() {
      setTodos(prev => ({
        ...prev,
        [date]: [...(prev[date] || []), newTodo],
      }));
    },

    undo() {
      setTodos(prev => ({
        ...prev,
        [date]: prev[date].filter(todo => todo.id !== newTodo.id),
      }));
    },
  };
}
