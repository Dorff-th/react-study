import { useState } from "react";
import HabitHeader from "@/components/habit/HabitHeader";
import AddHabitForm from "@/components/habit/AddHabitForm";
import HabitList from "@/components/habit/HabitList";
import { getTodayDateString } from "@/utils/dateUtils";
import { type Habit } from "@/types/habit";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useToggleItem } from "@/hooks/useToggleItem";

const HabitTrackerPage = () => {
  // 기본 선택 날짜 = 오늘
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    getTodayDateString()
  );

  // localStorage에 저장된 습관 데이터 불러오기
  const [habits, setHabits] = useLocalStorageState<Record<string, Habit[]>>(
    "habits",
    {}
  );

  // localStorage에 저장된 습관데이터 중에서 선택된 날짜의 데이터만 불러오기
  const habitListForSelectedDate = habits[selectedDate] || [];

  //신규 Habit 추가 이벤트 핸들러
  const handleAddHbit = (title: string, selectedDate: string) => {
    if (!title.trim()) return;

    //0) 입력할 데이터 생성
    const newHabit = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      date: selectedDate,
    };

    const updated = {
      ...habits,
      [selectedDate]: [...(habits[selectedDate] || []), newHabit],
    };

    setHabits(updated);
  };

  // 기존 Todo 변경 이벤트 핸들러
  const handleModifyHabit = (id: string, title: string) => {
    if (!title.trim()) return;

    // 1) 클릭한 날짜의 리스트만 업데이트
    const updatedList = habitListForSelectedDate.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );

    // 2) 전체 todos 객체에 updatedList 반영
    const updatedTodos = {
      ...habits,
      [selectedDate]: updatedList,
    };

    // 3) 상태 반영 + localStorage 저장
    setHabits(updatedTodos);
    //localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //habit 삭제 이벤트 핸들러
  const handleDeleteHabit = (id: string) => {
    const updatedList = habitListForSelectedDate.filter(
      (todo) => todo.id !== id
    );

    const updated = { ...habits, [selectedDate]: updatedList };

    setHabits(updated);
    //localStorage.setItem("todos", JSON.stringify(updated));
  };

  //완료 미완료 토글
  const toggleHabbit = useToggleItem(habits, setHabits, selectedDate);

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <HabitHeader today={selectedDate} />
      <AddHabitForm onAdd={handleAddHbit} />
      <HabitList
        habits={habitListForSelectedDate}
        onUpdate={handleModifyHabit}
        onDelete={handleDeleteHabit}
        onToggle={toggleHabbit}
      />
    </div>
  );
};

export default HabitTrackerPage;
