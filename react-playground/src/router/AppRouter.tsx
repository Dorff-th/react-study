import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import TodoListPage from "@/pages/TodoListPage";
import CalendarPage from "@/pages/CalendarPage";
import HabitTrackerPage from "@/pages/HabitTrackerPage";
import CounterControlsPage from "@/pages/CounterControlsPage";
import PostListPage from "@/pages/PostListPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/todo-list" element={<TodoListPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/habit-tracker" element={<HabitTrackerPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/counter-controls" element={<CounterControlsPage />} />
        <Route path="/" element={<Navigate to="/todo" replace />} />
      </Route>
    </Routes>
  );
}
