import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavItem = {
  to: string;
  label: string;
  badge?: string;
};

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = useMemo<NavItem[]>(
    () => [
      { to: "/todo-list", label: "Todo" },
      { to: "/calendar", label: "Calendar" },
      { to: "/habit-tracker", label: "Habit", badge: "Beta" },
      { to: "/counter-controls", label: "Counter" },
      { to: "/posts", label: "Posts" },
    ],
    []
  );

  const currentTitle = useMemo(() => {
    const found = navItems.find((n) => location.pathname.startsWith(n.to));
    return found?.label ?? "Home";
  }, [location.pathname, navItems]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <span className="text-sm font-bold">RL</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">React Lab</div>
            <div className="text-xs text-slate-500">Now: {currentTitle}</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cx(
                  "group relative rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              <span className="inline-flex items-center gap-2">
                {item.label}
                {item.badge && (
                  <span
                    className={cx(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      // badge 색은 취향껏 바꿔도 됨
                      "bg-amber-100 text-amber-800"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 md:inline-flex"
            onClick={() =>
              alert(
                "여기에 전역 Search, ThemeToggle, Profile 같은 걸 얹으면 됨"
              )
            }
          >
            Quick Action
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {/* 햄버거 아이콘(순수 div) */}
            <span className="relative block h-5 w-5">
              <span
                className={cx(
                  "absolute left-0 top-1 block h-0.5 w-5 rounded bg-slate-700 transition",
                  open && "top-2.5 rotate-45"
                )}
              />
              <span
                className={cx(
                  "absolute left-0 top-2.5 block h-0.5 w-5 rounded bg-slate-700 transition",
                  open && "opacity-0"
                )}
              />
              <span
                className={cx(
                  "absolute left-0 top-4 block h-0.5 w-5 rounded bg-slate-700 transition",
                  open && "top-2.5 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div className={cx("md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto w-full max-w-6xl px-4 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-1 p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cx(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    )
                  }
                >
                  <span className="inline-flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-xs opacity-70">↩︎</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
