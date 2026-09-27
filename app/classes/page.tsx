'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Trash2 } from 'lucide-react';
import ClassSchedule from '@/components/ClassSchedule';
import { classes, trainers } from '@/lib/data';
import { readStorage, writeStorage, STORAGE_KEYS } from '@/lib/storage';
import { Booking } from '@/lib/types';
import { useToast } from '@/components/NotificationSystem';

export default function ClassesPage() {
  const [tab, setTab] = useState<'schedule' | 'mine'>('schedule');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { notify } = useToast();

  useEffect(() => {
    setBookings(readStorage<Booking[]>(STORAGE_KEYS.bookings, []));
  }, [tab]);

  const cancel = (id: string, name: string) => {
    const updated = bookings.filter((b) => b.classId !== id);
    setBookings(updated);
    writeStorage(STORAGE_KEYS.bookings, updated);
    notify(`تم إلغاء حجز حصة ${name}`, 'info');
  };

  const myClasses = bookings
    .map((b) => classes.find((c) => c.id === b.classId))
    .filter(Boolean) as typeof classes;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper sm:text-4xl">
        حجز الحصص
      </h1>
      <p className="mt-2 text-steel">اختر يومك، احجز مكانك، وتابع حصصك القادمة.</p>

      <div className="mt-6 flex gap-2 border-b border-steel/15">
        {[
          { id: 'schedule', label: 'الجدول الأسبوعي' },
          { id: 'mine', label: `حصصي (${bookings.length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'schedule' | 'mine')}
            className={`border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              tab === t.id ? 'border-neon text-neon' : 'border-transparent text-steel'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'schedule' ? (
          <ClassSchedule />
        ) : myClasses.length === 0 ? (
          <p className="py-16 text-center text-steel">لم تحجز أي حصة بعد.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myClasses.map((c) => {
              const trainer = trainers.find((t) => t.id === c.trainerId);
              return (
                <div key={c.id} className="rounded-xl border border-steel/15 bg-white p-5 dark:bg-charcoal-light">
                  <p className="font-heading text-lg font-bold text-charcoal dark:text-paper">{c.name}</p>
                  <div className="mt-3 space-y-2 text-sm text-steel">
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {c.day}</p>
                    <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {c.time}</p>
                    <p className="flex items-center gap-2"><User className="h-4 w-4" /> {trainer?.name}</p>
                  </div>
                  <button
                    onClick={() => cancel(c.id, c.name)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-steel/30 py-2.5 text-sm font-bold text-steel hover:border-red-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" /> إلغاء الحجز
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
