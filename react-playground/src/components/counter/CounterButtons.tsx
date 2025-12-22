const CounterButtons = ({
  onIncrement,
  onDecrement,
}: {
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  return (
    <section className="flex gap-4">
      <button
        onClick={() => onDecrement()}
        className="
          flex-1 py-3 rounded-xl font-semibold
          bg-gray-200 hover:bg-gray-300
          dark:bg-gray-700 dark:hover:bg-gray-600
          transition
        "
      >
        − Decrement
      </button>

      <button
        onClick={() => onIncrement()}
        className="
          flex-1 py-3 rounded-xl font-semibold
          bg-indigo-600 text-white hover:bg-indigo-700
          transition
        "
      >
        + Increment
      </button>
    </section>
  );
};

export default CounterButtons;
