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
      iconBg: "bg-red-100",
      btnStyle: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    },
    warning: {
      icon: "⚡",
      iconBg: "bg-yellow-100",
      btnStyle:
        "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
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
        onClick={onCancel}
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

        <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-5 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`w-full sm:w-auto px-6 py-3 text-white rounded-lg font-medium bg-gradient-to-r ${config.btnStyle} transition-all shadow-lg hover:shadow-xl active:scale-95`}
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
