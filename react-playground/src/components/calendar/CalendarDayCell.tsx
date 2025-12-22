import clsx from "clsx";

type CalendarDayCellProps = {
  date: string; // '13' 또는 '01'
  weekday: number; // 0: 일요일, 6: 토요일
  isToday?: boolean;
  total: number;
  completedCount: number;
  //onClick?: (day: string, total: number) => void;
  onClick?: () => void;
};

const CalendarDayCell = ({
  date,
  weekday,
  isToday,
  total,
  completedCount,
  onClick,
}: CalendarDayCellProps) => {
  const highlightStyle = isToday
    ? "ring-2 ring-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"
    : "";

  const dayColor =
    weekday === 0
      ? "text-red-500"
      : weekday === 6
      ? "text-blue-500"
      : "text-black dark:text-white";

  const isClickable = total > 0;

  return (
    <div
      className={clsx(
        "h-20 w-full rounded-xl p-2 relative transition-all duration-200 select-none",
        "bg-gray-100 dark:bg-gray-700",
        isClickable
          ? "cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600"
          : "cursor-not-allowed opacity-40",
        highlightStyle
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {/* 날짜 */}
      <div
        className={clsx(
          "absolute top-1 left-2 text-sm font-semibold",
          dayColor
        )}
      >
        {date}
      </div>

      {/* 완료/전체 */}
      {total > 0 && (
        <div className="absolute bottom-1 right-2 text-xs text-gray-700 dark:text-gray-200">
          <span className="font-semibold">{completedCount}</span>
          <span className="opacity-70">/{total}</span>
        </div>
      )}

      {/* 완료율 Progress Bar */}
      {total > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-200"
            style={{ width: `${(completedCount / total) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CalendarDayCell;
