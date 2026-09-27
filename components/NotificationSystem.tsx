'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle2, X, Droplets } from 'lucide-react';
import { readStorage, STORAGE_KEYS } from '@/lib/storage';
import { Booking, Membership } from '@/lib/types';
import { classes, plans } from '@/lib/data';

type ToastKind = 'success' | 'info';
interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  notify: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue>({ notify: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const notify = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, kind }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // تذكير بشرب الماء كل ساعة
  useEffect(() => {
    const interval = window.setInterval(() => {
      notify('حان وقت شرب كوب ماء 💧', 'info');
    }, 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [notify]);

  // تذكير بموعد أقرب حصة محجوزة (يُعرض عند الدخول كمحاكاة للتذكير قبل ساعة)
  useEffect(() => {
    const bookings = readStorage<Booking[]>(STORAGE_KEYS.bookings, []);
    if (bookings.length > 0) {
      const nextClass = classes.find((c) => c.id === bookings[0].classId);
      if (nextClass) {
        const t = window.setTimeout(() => {
          notify(`تذكير: حصة ${nextClass.name} تبدأ الساعة ${nextClass.time} — استعد!`, 'info');
        }, 4000);
        return () => window.clearTimeout(t);
      }
    }
  }, [notify]);

  // تذكير بموعد تجديد العضوية عند اقتراب الموعد
  useEffect(() => {
    const membership = readStorage<Membership | null>(STORAGE_KEYS.membership, null);
    if (membership) {
      const plan = plans.find((p) => p.id === membership.planId);
      const start = new Date(membership.startDate);
      const renewal = new Date(start);
      renewal.setMonth(renewal.getMonth() + (plan?.id === 'p3' ? 12 : plan?.id === 'p2' ? 3 : 1));
      const daysLeft = Math.ceil((renewal.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 7 && daysLeft >= 0) {
        const t = window.setTimeout(() => {
          notify(`عضويتك تنتهي خلال ${daysLeft} يوم — جدّدها لتفادي الانقطاع.`, 'info');
        }, 6000);
        return () => window.clearTimeout(t);
      }
    }
  }, [notify]);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-4 inset-x-4 z-[100] flex flex-col gap-2 sm:right-4 sm:left-auto sm:w-96" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-rise-in flex items-start gap-3 rounded-lg border border-steel/20 bg-white dark:bg-charcoal-light px-4 py-3 shadow-lg"
          >
            {t.kind === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-neon" />
            ) : (
              <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-neon" />
            )}
            <p className="flex-1 text-sm text-charcoal dark:text-paper">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="إغلاق"
              className="text-steel hover:text-charcoal dark:hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
