import { useUI } from "@/hooks/useUI";

export default function Toast() {
  const { toast, clearToast } = useUI();

  if (!toast) return null;
  return (
    <div
      className="
      fixed bottom-6 right-6 z-50
      px-4 py-3 rounded-md
      shadow-lg
      bg-slate-800 text-white
    "
      onClick={clearToast}
    >
      {toast?.message}
    </div>
  );
}
