"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const AlertDialog = ({
  isOpen,
  title,
  message,
  type = "info",
  onClose,
}: AlertDialogProps) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: "✅",
      iconBg: "bg-green-100",
      btnStyle:
        "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    },
    error: {
      icon: "❌",
      iconBg: "bg-red-100",
      btnStyle: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    },
    info: {
      icon: "ℹ️",
      iconBg: "bg-blue-100",
      btnStyle:
        "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    },
  };

  const config = typeConfig[type];

  const dialogContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center text-2xl`}
            >
              {config.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{message}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-5 flex justify-end">
          <button
            onClick={onClose}
            className={`w-full sm:w-auto px-8 py-3 text-white rounded-lg font-medium bg-gradient-to-r ${config.btnStyle} transition-all shadow-lg hover:shadow-xl active:scale-95`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(dialogContent, document.body)
    : null;
};

export default AlertDialog;
