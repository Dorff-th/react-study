const CounterLogPanel = ({ logs }: { logs: string[] }) => {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Change Log
      </h2>

      <div className="h-32 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2 text-sm">
        {/* map으로 로그 렌더링 */}
        {logs.length > 0 ? (
          logs.map((log, i) => {
            return <li key={i}> {log} </li>;
          })
        ) : (
          <div className="text-gray-400 italic">아직 로그가 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default CounterLogPanel;
