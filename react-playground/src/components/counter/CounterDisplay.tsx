const CounterDisplay = ({ count }: { count: number }) => {
  return (
    <section className="flex items-center justify-center">
      <div className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">
        {count}
      </div>
    </section>
  );
};

export default CounterDisplay;
