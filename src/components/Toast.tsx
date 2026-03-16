import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Toast.module.scss";

export type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  durationMs: number;
  closing?: boolean;
};

type ToastListener = (toast: ToastItem) => void;

const listeners = new Set<ToastListener>();

function subscribe(listener: ToastListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function showToast(
  message: string,
  seconds = 3,
  type: ToastType = "info",
) {
  const toast: ToastItem = {
    id: Date.now() + Math.floor(Math.random() * 10000),
    message,
    type,
    durationMs: Math.max(0, seconds * 1000),
  };
  listeners.forEach((listener) => listener(toast));
}

function ToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const closeTimersRef = useRef<Map<number, number>>(new Map());
  const removeTimersRef = useRef<Map<number, number>>(new Map());

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
    const closeTimerId = closeTimersRef.current.get(id);
    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
      closeTimersRef.current.delete(id);
    }
    const removeTimerId = removeTimersRef.current.get(id);
    if (removeTimerId) {
      window.clearTimeout(removeTimerId);
      removeTimersRef.current.delete(id);
    }
  }, []);

  const closeToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, closing: true } : item)),
    );
    if (!removeTimersRef.current.has(id)) {
      const removeTimerId = window.setTimeout(() => removeToast(id), 220);
      removeTimersRef.current.set(id, removeTimerId);
    }
  }, [removeToast]);

  useEffect(() => {
    return subscribe((toast) => {
      setToasts((prev) => [...prev, { ...toast, closing: false }]);
      if (toast.durationMs > 0) {
        const closeTimerId = window.setTimeout(
          () => closeToast(toast.id),
          toast.durationMs,
        );
        closeTimersRef.current.set(toast.id, closeTimerId);
      }
    });
  }, [closeToast]);

  useEffect(() => {
    return () => {
      closeTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      closeTimersRef.current.clear();
      removeTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      removeTimersRef.current.clear();
    };
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            styles.toast,
            styles[toast.type],
            toast.closing && styles.closing,
          )}
          role="status"
          aria-live="polite"
        >
          <span className={styles.message}>{toast.message}</span>
        </div>
      ))}
    </>
  );
}

export default ToastHost;
