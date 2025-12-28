import { useEffect } from "react";

import ActionLogPanelUI from "./ActionLogPanelUI";

type ActionLogModalProps = {
  onClose: () => void;
};

export const ActionLogModal = ({ onClose }: ActionLogModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ActionLogPanelUI onClose={onClose} />
      </div>
    </div>
  );
};
