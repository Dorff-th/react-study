type Props = {
  today: string;
};

const HabitHeader = ({ today }: Props) => {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-bold mb-1">습관 트래커</h1>
      <span className="text-sm text-gray-500">{today}</span>
    </div>
  );
};

export default HabitHeader;
