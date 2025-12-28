import React, { createContext, useContext, useState, useEffect } from "react";
import { type Action } from "../types/action";

interface ActionContextValue {
  dispatch: (action: Action) => void;
  undoLastAction: () => void;
}

const ActionContext = createContext<ActionContextValue | null>(null);

export function ActionProvider({ children }: { children: React.ReactNode }) {
  const [pendingAction, setPendingAction] = useState<Action | null>(null);
  const [pendingUndo, setPendingUndo] = useState<Action | null>(null);

  const [actionLog, setActionLog] = useState<Action[]>([]);

  const dispatch = (action: Action) => {
    setPendingAction(action);
  };

  const undoLastAction = () => {
    setPendingUndo(actionLog[actionLog.length - 1] ?? null);
  };

  useEffect(() => {
    if (!pendingAction) return;

    pendingAction.do();
    setActionLog((prev) => [...prev, pendingAction]);
    setPendingAction(null);
  }, [pendingAction]);

  useEffect(() => {
    if (!pendingUndo) return;

    pendingUndo.undo(); // ✅ updater 밖
    setActionLog((prev) => prev.slice(0, -1));
    setPendingUndo(null);
  }, [pendingUndo]);

  return (
    <ActionContext.Provider value={{ dispatch, undoLastAction }}>
      {children}
    </ActionContext.Provider>
  );
}

export function useAction() {
  const ctx = useContext(ActionContext);
  if (!ctx) {
    throw new Error("useAction must be used within ActionProvider");
  }
  return ctx;
}
