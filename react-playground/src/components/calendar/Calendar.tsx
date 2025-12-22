import { useState, useEffect } from "react";
import { getDaysInMonth } from "@/utils/calendarUtils";
import { getTodosByMonth } from "@/utils/dateUtils";
import clsx from "clsx";
import CalendarSelector from "./CalendarSelector";
import CalendarDayCell from "./CalendarDayCell";
import { type Todo } from "@/types/todo";
import TodoListModal from "../todo/TodoListModal";

const Calendar = () => {
  /* === state 영역 === */
  // todos 초기화 (localStorage에서 딱 한 번만 읽음)
  const [todos, setTodos] = useState<Record<string, Todo[]>>(() => {
    const saved = localStorage.getItem("todos");
    if (!saved || saved === "undefined" || saved === "null") return {};
    return JSON.parse(saved);
  });

  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //현재 시각
  const [currentDate, setCurrentDate] = useState(new Date());

  // 선택된 날짜의 todo 리스트
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  /* === variables 영역 === */
  //현재 시각 기준으로 년  월 // ex : 2025 , 12
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; //현재 시각 기준으로 월 (0~11) - 초기 값은 현재 월로 설정

  //특정월 ("YYYYY-MM") 에 해당하는 데이터만 가져오기
  const todosByMonth = getTodosByMonth(todos, `${year}-${month}`);

  // 해당월이 1일 부터 마지막일 (30일, 31일, 29일 등)을 같는 배열
  const monthDays = getDaysInMonth(year, month);

  //해당 월이 첫번째 요일(1일이 무슨요일인가를 알아냄)
  const firstDay = new Date(
    `${year}-${String(month).padStart(2, "0")}-01`
  ).getDay();

  //앞쪽 padding(빈 칸) 계산
  //달력은 항상 일요일부터 시작하므로, 월의 1일이 월요일이면 → 앞에 1칸m 1일이 수요일이면 → 앞에 3칸, 1일이 토요일이면 → 앞에 6칸이 필요함.
  const padding = Array(firstDay).fill(null);

  //요일
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

  /* === useEffect 영역  === */
  //todo-list의 데이터 호출 - 불필요
  // useEffect(() => {
  //   const saved = localStorage.getItem("todos");
  //   const todos: Todo[] = saved ? JSON.parse(saved) : [];

  //   setTodoList(todosByMonth);
  // }, []);

  /* === 이벤트 핸들러 영역 === */
  //이전달로 이동하는 이벤트 핸들러 함수
  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  //다음달로 이동하는 이벤트 핸들러 함수
  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  //날짜 클릭 이벤트 핸들러 함수
  const handleDayClick = (day: string, total: number) => {
    if (total === 0) return; // todo 없는 날짜는 클릭 불가

    const todosForDate = todosByMonth.filter((t) => t.date === day);

    setSelectedDate(day);
    setSelectedTodos(todosForDate);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* 월 이동 헤더 */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={handlePrevMonth}
          className="text-sm sm:text-base text-gray-500 font-medium"
        >
          ◀ Prev
        </button>

        <CalendarSelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />

        <button
          onClick={handleNextMonth}
          className="text-sm sm:text-base text-gray-500 font-medium"
        >
          Next ▶
        </button>
      </div>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day, i) => (
          <div
            key={i}
            className={clsx(
              "h-12 flex items-center justify-center rounded-md shadow-md",
              "bg-gradient-to-b from-blue-100 to-gray-50 dark:from-gray-800 dark:to-gray-700",
              "text-sm font-semibold tracking-wide",
              i === 0
                ? "text-red-500"
                : i === 6
                ? "text-blue-500"
                : "text-gray-800 dark:text-white"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-1">
        {padding.map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {monthDays.map((day) => {
          const dateObj = new Date(day);

          //해당 일자가 무슨 요일인지? : 왜? 토요일이면 파란색, 일요일이면 빨간색으로 표시하기 위해
          const weekday = dateObj.getDay(); // getDay() 결과: 0(일요일) ~ 6(토요일)

          //해당 일자가 오늘인지? (달력중에 현재 시각과 일치하는 날일 표시하기 위해)
          const today = new Date();
          const isToday =
            today.getFullYear() === dateObj.getFullYear() &&
            today.getMonth() === dateObj.getMonth() &&
            today.getDate() === dateObj.getDate();

          const todosForDate = todosByMonth.filter((todo) => todo.date === day);
          const total = todosForDate.length;
          const completedCount = todosForDate.filter((t) => t.completed).length;

          return (
            <div key={day}>
              <CalendarDayCell
                date={day.split("-")[2].replace(/^0/, "")}
                weekday={weekday}
                isToday={isToday}
                total={total}
                completedCount={completedCount}
                onClick={() => handleDayClick(day, total)}
              />
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedDate && (
        <TodoListModal
          date={selectedDate}
          todos={selectedTodos}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
