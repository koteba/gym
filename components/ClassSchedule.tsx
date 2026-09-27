'use client';

import { useEffect, useState } from 'react';
import { Clock, Users, User } from 'lucide-react';
import { classes as allClasses, trainers } from '@/lib/data';
import { readStorage, writeStorage, STORAGE_KEYS } from '@/lib/storage';
import { Booking, Difficulty } from '@/lib/types';
import { useToast } from './NotificationSystem';

const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

const difficultyColor: Record<Difficulty, string> = {
  مبتدئ: 'bg-neon/15 text-neon',
  متوسط: 'bg-steel/15 text-steel',
  متقدم: 'bg-charcoal text-paper dark:bg-paper dark:text-charcoal',
};

export default function ClassSchedule({ compact = false }: { compact?: boolean }) {
  const [activeDay, setActiveDay] = useState(days[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { notify } = useToast();

  useEffect(() => {
    setBookings(readStorage<Booking[]>(STORAGE_KEYS.bookings, []));
  }, []);

  const isBooked = (classId: string) => bookings.some((b) => b.classId === classId);

  const toggleBooking = (classId: string, className: string) => {
    if (isBooked(classId)) {
      const updated = bookings.filter((b) => b.classId !== classId);
      setBookings(updated);
      writeStorage(STORAGE_KEYS.bookings, updated);
      notify(`تم إلغاء حجز حصة ${className}`, 'info');
    } else {
      const updated = [...bookings, { id: crypto.randomUUID(), classId, bookedAt: new Date().toISOString() }];
      setBookings(updated);
      writeStorage(STORAGE_KEYS.bookings, updated);
      notify(`تم تأكيد حجزك في حصة ${className} ✅`);
    }
  };

  const dayClasses = allClasses.filter((c) => c.day === activeDay);

  return (
    <div>
      <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-2">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold transition-colors ${
              activeDay === d
                ? 'bg-neon text-charcoal'
                : 'bg-steel/10 text-steel hover:bg-steel/20'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dayClasses.length === 0 && (
          <p className="col-span-full py-10 text-center text-steel">لا توجد حصص هذا اليوم.</p>
        )}
        {dayClasses.map((c) => {
          const trainer = trainers.find((t) => t.id === c.trainerId);
          const remaining = c.capacity - c.booked - (isBooked(c.id) ? 1 : 0);
          const full = remaining <= 0;
          return (
            <div key={c.id} className="rounded-xl border border-steel/15 bg-white p-5 dark:bg-charcoal-light">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-heading text-lg font-bold text-charcoal dark:text-paper">{c.name}</p>
                  <p className="text-xs text-steel">{c.nameEn}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${difficultyColor[c.difficulty]}`}>
                  {c.difficulty}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-steel">
                <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {c.time}</p>
                <p className="flex items-center gap-2"><User className="h-4 w-4" /> {trainer?.name}</p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {full ? 'مكتملة' : `${remaining} مكان متبقٍ`}
                </p>
              </div>
              {!compact && (
                <button
                  onClick={() => toggleBooking(c.id, c.name)}
                  disabled={full && !isBooked(c.id)}
                  className={`mt-4 w-full rounded-md py-2.5 text-sm font-bold transition-colors ${
                    isBooked(c.id)
                      ? 'border border-neon text-neon hover:bg-neon/10'
                      : full
                      ? 'cursor-not-allowed bg-steel/15 text-steel'
                      : 'bg-neon text-charcoal hover:bg-neon-dark'
                  }`}
                >
                  {isBooked(c.id) ? 'إلغاء الحجز' : full ? 'الحصة مكتملة' : 'احجز الآن'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
