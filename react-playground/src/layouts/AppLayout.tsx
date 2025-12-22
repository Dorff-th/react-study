import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
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
