export const getDaysInMonth = (year: number, month: number): string[] => {
  const date = new Date(year, month - 1, 1);
  const days: string[] = [];

  while (date.getMonth() === month - 1) { // 만약 현재 달의 마지막 +1로 되어버리면 다음달로 넘어가니까 현재달만 유지
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0'); 
    days.push(`${yyyy}-${mm}-${dd}`);
    
    date.setDate(date.getDate() + 1);  // 현재 달의 날 +1 .. 즉 while 루프를 돌면서 1일씩 증가함
  }

  return days;
};
