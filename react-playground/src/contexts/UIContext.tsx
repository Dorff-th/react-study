import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export interface UIContextValue {
  isLoading: boolean;

  showLoading: () => void;
  hideLoading: () => void;

  showToast: (message: string, type?: ToastType) => void;
  clearToast: () => void;
}

export const UIContext = createContext<UIContextValue | null>(null);
