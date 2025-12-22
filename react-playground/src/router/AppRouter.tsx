import { Routes, Route, Navigate } from "react-router-dom";
import TodoListPage from "@/pages/TodoListPage";
import CalendarPage from "@/pages/CalendarPage";
import HabitTrackerPage from "@/pages/HabitTrackerPage";
import CounterControlsPage from "@/pages/CounterControlsPage";
import PostListPage from "@/pages/PostListPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/todo" element={<TodoListPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/tracker" element={<HabitTrackerPage />} />
      <Route path="/posts" element={<PostListPage />} />

      <Route path="/counter-controls" element={<CounterControlsPage />} />
      <Route path="/" element={<Navigate to="/todo" replace />} />
    </Routes>
  );
}
