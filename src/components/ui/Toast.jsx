"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

let toastCount = 0;
let observers = [];

const notify = (message, type = "info") => {
  const id = toastCount++;
  observers.forEach((callback) => callback({ id, message, type }));
};

export const toast = {
  success: (msg) => notify(msg, "success"),
  error: (msg) => notify(msg, "error"),
  info: (msg) => notify(msg, "info"),
};

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const addToast = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        removeToast(toast.id);
      }, 5000);
    };

    const removeToast = (id) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    observers.push(addToast);
    return () => {
      observers = observers.filter((obs) => obs !== addToast);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl transition-all duration-300 animate-in slide-in-from-right-full ${
            t.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : t.type === "error"
              ? "border-red-500/20 bg-red-500/10 text-red-400"
              : "border-accent/20 bg-accent/10 text-accent"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle size={20} />
          ) : t.type === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <Info size={20} />
          )}
          <p className="text-sm font-medium">{t.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
            className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
