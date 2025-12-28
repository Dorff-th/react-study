const SomeTestPage = () => {
  //현재 시각
  const today = new Date(); //ex : Sun Dec 07 2025 19:12:16 GMT+0900

  //현재 시각 기준으로 년  // ex : 2025
  const year = today.getFullYear();

  //현재 시각 기준으로 월 (0~11)
  //const month = today.getMonth(); // ex : 12월이면 11로 표시
  const month = today.getMonth() + 1;

  // 이번달의 1일의 요일
  const monthFirstDay = new Date(year, month, 1);
  //console.log("monthFirstDay", monthFirstDay); // ex : Mon Dec 01 2025 00:00:00 GMT+0900

  //이번달의 마지막 날짜와 요일 알아내기
  //const monthLastDate = new Date(year, month + 1, 0).getDate();
  const monthLastDate = new Date(year, month + 1, 0); // 마지막 인자인 0은 현재시각 기준 이전달의 마지막 날짜를 의미
  //console.log("monthLastDate", monthLastDate);

  //해당 월이 첫번째 요일(1일이 무슨요일인가를 알아냄)
  const firstDay = new Date(
    `${year}-${String(11).padStart(2, "0")}-01`
  ).getDay();
  console.log("firtsDay ", firstDay);
  const padding = Array(firstDay).fill(null);
  console.log("padding : ", padding);

  const days = getDaysInMonth(2025, 12);

  const canlendar = days.map((day) => {
    const dateObj = new Date(day);
    const weekday = dateObj.getDay(); // getDay() 결과: 0(일요일) ~ 6(토요일)
    const date = dateObj.getDate();

    // 해당월이 1일부터 마지막 일까지중에 오늘 날짜인지 아닌지 판단
    const isToday =
      today.getFullYear() === dateObj.getFullYear() &&
      today.getMonth() === dateObj.getMonth() &&
      today.getDate() === dateObj.getDate();

    // 오늘 날짜면 console에 오늘이 며칠인가 출력
    // if (isToday)
    //   console.log(`오늘은 ${month}월 ${dateObj.getDate()}일 입니다.`);

    return date;
  });

  //const arr = [];
  //for (let i = 1; i <= 20; i++) arr.push(i);
  //const arr = Array.from({ length: 20 }, (_, i) => i + 1);
  const arr = [...Array(20)].map((_, i) => i + 1);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="grid grid-cols-7 gap-1">
            {arr.map((el) => (
              <div key={el} className="bg-slate-400 border-spacing-x-24">
                {el}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const getDaysInMonth = (year: number, month: number): string[] => {
  const date = new Date(year, month - 1, 1);
  const days: string[] = [];

  while (date.getMonth() === month - 1) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    days.push(`${yyyy}-${mm}-${dd}`);
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export default SomeTestPage;
