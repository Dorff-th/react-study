import { type Todo } from "@/types/todo";

//오늘 날짜를 "YYYY-MM-DD" 형식으로 가져오기
export const getTodayDateString = () => {

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const today = `${yyyy}-${mm}-${dd}`; // ← 오늘 날짜 자동 생성

    return today;
}

//특정월을 "YYYY-MM" 형식으로 가져오기
export const getTodosByMonth = (todos: Record<string, Todo[]>, targetMonth: string) => {
  return Object.entries(todos)
    .filter(([dateKey]) => dateKey.startsWith(targetMonth))
    .flatMap(([_, list]) => list);
};
