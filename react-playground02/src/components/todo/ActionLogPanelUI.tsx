const ActionLogPanelUI = () => {
  return (
    <div className="w-full max-w-xl bg-black border border-slate-700 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
        <span className="text-sm font-semibold text-green-400">Action Log</span>
        <button
          className="text-slate-400 hover:text-red-400 text-xs"
          aria-label="close"
        >
          ✕
        </button>
      </div>

      {/* Log Body */}
      <div className="h-56 overflow-y-auto px-4 py-2 font-mono text-xs text-green-400 space-y-1">
        <div>[ADD ] [2025-01-15 14:22:31] 장보기</div>
        <div>[ADD ] [2025-01-15 14:23:10] 운동하기</div>
        <div className="text-yellow-400">
          [UNDO] [2025-01-15 14:24:02] 운동하기
        </div>
        <div>[ADD ] [2025-01-15 14:25:45] 책 읽기</div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-700 text-right">
        <button className="text-xs text-slate-400 hover:text-white">
          clear (UI only)
        </button>
      </div>
    </div>
  );
};

export default ActionLogPanelUI;
