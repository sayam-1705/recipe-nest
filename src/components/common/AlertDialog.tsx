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
      iconBg: "bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-green/40",
      btnStyle:
        "from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-green hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]",
    },
    error: {
      icon: "❌",
      iconBg: "bg-gradient-to-br from-neon-pink/20 to-red-600/20 border border-neon-pink/40",
      btnStyle: "from-neon-pink to-red-600 hover:from-red-600 hover:to-neon-pink hover:shadow-[0_0_30px_rgba(255,0,110,0.6)]",
    },
    info: {
      icon: "ℹ️",
      iconBg: "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/40",
      btnStyle:
        "from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]",
    },
  };

  const config = typeConfig[type];

  const dialogContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative glassmorphism border border-neon-blue/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.3)] max-w-md w-full animate-slide-in-3d">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center text-2xl animate-neon-pulse`}
            >
              {config.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300">{message}</p>
            </div>
          </div>
        </div>

        <div className="glassmorphism-dark border-t border-neon-blue/20 px-6 py-4 sm:px-8 sm:py-5 flex justify-end">
          <button
            onClick={onClose}
            className={`w-full sm:w-auto px-8 py-3 text-white rounded-lg font-medium bg-gradient-to-r ${config.btnStyle} transition-all shadow-lg hover:shadow-xl active:scale-95 neon-border`}
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
