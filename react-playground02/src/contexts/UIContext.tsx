import { createContext } from "react";
import { type UIState } from "@/UIProvider/UIState";

export interface UIContextValue extends UIState {
  showLoading: () => void;
  hideLoading: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  clearToast: () => void;
}

export const UIContext = createContext<UIContextValue | null>(null);
