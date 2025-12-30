// UIState.ts
export type ToastType = "success" | "error" | "info";

export interface ToastState {
  message: string;
  type: ToastType;
}

export interface UIState {
  isLoading: boolean;
  toast: ToastState | null;
}

export type UIAction =
  | { type: "SHOW_LOADING" }
  | { type: "HIDE_LOADING" }
  | { type: "SHOW_TOAST"; payload: { message: string; toastType: ToastType } }
  | { type: "CLEAR_TOAST" };
