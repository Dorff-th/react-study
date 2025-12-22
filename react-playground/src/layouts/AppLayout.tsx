import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

export default function AppLayout() {
  const { theme } = useTheme();
  console.log(theme);
  //bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100
  //<div className="min-h-dvh bg-slate-50 text-slate-900 ">
  return (
    <div
      className={clsx(
        "min-h-dvh",
        theme === "dark" && "dark",
        "bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <AppHeader />

      {/* Main content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-8">
        <div className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} My React Lab — 오늘도 한 걸음 🐾
        </div>
      </footer>
    </div>
  );
}
