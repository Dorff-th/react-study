// UIProvider.tsx
import { useEffect, useReducer } from "react";
import { UIContext } from "@/contexts/UIContext";
import { uiReducer, initialUIState } from "./uiReducer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Toast from "@/components/ui/Toast";

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  const showLoading = () => dispatch({ type: "SHOW_LOADING" });
  const hideLoading = () => dispatch({ type: "HIDE_LOADING" });

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    dispatch({
      type: "SHOW_TOAST",
      payload: { message, toastType: type },
    });
  };

  const clearToast = () => dispatch({ type: "CLEAR_TOAST" });

  // ⭐ 자동 사라짐 처리
  useEffect(() => {
    if (!state.toast) return;

    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_TOAST" });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [state.toast]);

  return (
    <UIContext.Provider
      value={{
        ...state,
        showLoading,
        hideLoading,
        showToast,
        clearToast,
      }}
    >
      {children}
      <LoadingOverlay />
      <Toast />
    </UIContext.Provider>
  );
}
