import React, { createContext, useContext, useState, useEffect } from "react";
import { type Action } from "../types/action";
import { type ActionLog } from "../types/ActionLog";
import { formatNow } from "@/utils/formatNow";

interface ActionContextValue {
  dispatch: (action: Action) => void;
  undoLastAction: () => void;
  actionLogs: ActionLog[];
}

const ActionContext = createContext<ActionContextValue | null>(null);

export function ActionProvider({ children }: { children: React.ReactNode }) {
  const [pendingAction, setPendingAction] = useState<Action | null>(null);
  const [pendingUndo, setPendingUndo] = useState<Action | null>(null);

  const [action, setAction] = useState<Action[]>([]);

  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);

  const dispatch = (action: Action) => {
    setPendingAction(action);
    setActionLogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "ADD",
        title: action.payload.title,
        timestamp: formatNow(),
      },
    ]);
  };

  const undoLastAction = () => {
    setPendingUndo(action[action.length - 1] ?? null);
    setActionLogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "UNDO",
        title: action[action.length - 1]?.payload.title ?? "",
        timestamp: formatNow(),
      },
    ]);
  };

  useEffect(() => {
    if (!pendingAction) return;

    pendingAction.do();
    setAction((prev) => [...prev, pendingAction]);
    setPendingAction(null);
  }, [pendingAction]);

  useEffect(() => {
    if (!pendingUndo) return;

    pendingUndo.undo(); // ✅ updater 밖
    setAction((prev) => prev.slice(0, -1));
    setPendingUndo(null);
  }, [pendingUndo]);

  return (
    <ActionContext.Provider value={{ dispatch, undoLastAction, actionLogs }}>
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
