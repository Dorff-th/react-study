import { useUI } from "@/hooks/useUI";

export default function LoadingOverlay() {
  const { isLoading } = useUI();

  if (!isLoading) return null;

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/40
      flex items-center justify-center
    "
    >
      <div
        className="
        px-6 py-4 rounded-lg
        bg-white dark:bg-slate-800
        shadow-lg
        animate-pulse
      "
      >
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
}
