import { useState, useEffect, useRef, useCallback } from "react";

import CounterHeader from "@/components/counter/CounterHeader";
import CounterDisplay from "@/components/counter/CounterDisplay";
import CounterButtons from "@/components/counter/CounterButtons";
import CounterLogPanel from "@/components/counter/CounterLogPanel";

const CounterControlsPage = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>(count);

  const [logs, setLogs] = useState<string[]>([]);

  const MAX_COUNT = 10;
  const MIN_COUNT = 0;
  const MAX_LENGTH = 5;

  // useEffect가 최초 마운트 시 실행되는 것을 막기 위한 플래그
  const isFirstRender = useRef(true); //

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const logStr = `count 변경감지 : 기존 ${prevCountRef.current}, 변경 : ${count}`;
    prevCountRef.current = count;

    //const newLogs = [logStr, ...logs];
    //if (newLogs.length > MAX_LENGTH) newLogs.slice(0, -1);  <-- 반영안됌
    //최신 logs(prevLogs)의 맨 앞 요소에 신규요소(logStr)을 추가하고, 앞에서 5개까지만 요소를 유지(.slice(0, MAX_LENGTH)))

    setLogs((prevLogs) => [logStr, ...prevLogs].slice(0, MAX_LENGTH));
  }, [count]);

  const handleIncrementCount = useCallback(() => {
    setCount((prev) => (prev === MAX_COUNT ? prev : prev + 1));
  }, []);

  const handleDecrementCount = useCallback(() => {
    setCount((prev) => (prev === MIN_COUNT ? prev : prev - 1));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <CounterHeader />
        <CounterDisplay count={count} />
        <CounterButtons
          onIncrement={handleIncrementCount}
          onDecrement={handleDecrementCount}
        />
        <CounterLogPanel logs={logs} />
      </div>
    </div>
  );
};

export default CounterControlsPage;
