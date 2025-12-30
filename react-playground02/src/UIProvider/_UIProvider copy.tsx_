import { useState } from "react";
import { UIContext } from "@/contexts/UIContext";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Toast from "@/components/ui/Toast";

export function UIProvider({ children }: { children: React.ReactNode }) {
  // 1️⃣ loading state
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  // 2️⃣ toast state
  const DURATION = 3000;
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => {
      clearToast();
    }, DURATION);
  };

  const clearToast = () => setToast(null);

  const value = {
    isLoading,
    showLoading,
    hideLoading,
    showToast,
    clearToast,
    toast,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      {/* 👇 UI 전용 컴포넌트는 여기서 렌더 */}
      <LoadingOverlay />
      <Toast />
    </UIContext.Provider>
  );
}
