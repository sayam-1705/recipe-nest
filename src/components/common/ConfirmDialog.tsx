"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: "⚠️",
      iconBg: "bg-gradient-to-br from-neon-pink/20 to-red-600/20 border border-neon-pink/40",
      btnStyle: "from-neon-pink to-red-600 hover:from-red-600 hover:to-neon-pink hover:shadow-[0_0_30px_rgba(255,0,110,0.6)]",
    },
    warning: {
      icon: "⚡",
      iconBg: "bg-gradient-to-br from-neon-yellow/20 to-neon-orange/20 border border-neon-yellow/40",
      btnStyle:
        "from-neon-yellow to-neon-orange hover:from-neon-orange hover:to-neon-yellow hover:shadow-[0_0_30px_rgba(255,214,10,0.6)]",
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
        onClick={onCancel}
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

        <div className="glassmorphism-dark border-t border-neon-blue/20 px-6 py-4 sm:px-8 sm:py-5 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 text-gray-300 glassmorphism border-2 border-neon-blue/40 rounded-lg font-medium hover:bg-cyber-light hover:border-neon-purple/60 transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`w-full sm:w-auto px-6 py-3 text-white rounded-lg font-medium bg-gradient-to-r ${config.btnStyle} transition-all shadow-lg hover:shadow-xl active:scale-95 neon-border`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(dialogContent, document.body)
    : null;
};

export default ConfirmDialog;
