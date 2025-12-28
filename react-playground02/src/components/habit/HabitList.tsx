import HabitItem from "@/components/habit/HabitItem";
import { type Habit } from "@/types/habit";

type habitsProps = {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

const HabitList = ({ habits, onToggle, onDelete, onUpdate }: habitsProps) => {
  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default HabitList;
