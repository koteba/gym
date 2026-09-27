'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Award, Clock3 } from 'lucide-react';
import { trainers } from '@/lib/data';
import { Trainer } from '@/lib/types';
import { useToast } from './NotificationSystem';

export default function TrainersGrid() {
  const specialties = ['الكل', ...Array.from(new Set(trainers.map((t) => t.specialty)))];
  const [filter, setFilter] = useState('الكل');
  const [active, setActive] = useState<Trainer | null>(null);
  const { notify } = useToast();

  const filtered = filter === 'الكل' ? trainers : trainers.filter((t) => t.specialty === filter);

  const bookSession = () => {
    if (active) notify(`تم إرسال طلب حجز جلسة خاصة مع ${active.name}`);
    setActive(null);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
              filter === s ? 'bg-neon text-charcoal' : 'bg-steel/10 text-steel hover:bg-steel/20'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t)}
            className="group overflow-hidden rounded-xl border border-steel/15 text-right"
          >
            <div className="relative h-64 w-full">
              <Image src={t.image} alt={t.name} fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="bg-white p-5 dark:bg-charcoal-light">
              <p className="font-heading text-lg font-bold text-charcoal dark:text-paper">{t.name}</p>
              <p className="text-sm text-neon">{t.specialty}</p>
              <p className="mt-2 text-xs text-steel">{t.years} سنوات خبرة</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white dark:bg-charcoal-light"
          >
            <div className="relative h-56 w-full">
              <Image src={active.image} alt={active.name} fill sizes="500px" className="object-cover" />
              <button
                onClick={() => setActive(null)}
                aria-label="إغلاق"
                className="absolute left-3 top-3 rounded-full bg-charcoal/70 p-2 text-paper hover:bg-neon hover:text-charcoal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="font-heading text-2xl font-extrabold text-charcoal dark:text-paper">{active.name}</p>
              <p className="mt-1 text-neon">{active.specialty}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-steel">
                <Clock3 className="h-4 w-4" /> {active.years} سنوات خبرة
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.certs.map((c) => (
                  <span key={c} className="flex items-center gap-1.5 rounded-full bg-steel/10 px-3 py-1 text-xs text-steel">
                    <Award className="h-3.5 w-3.5 text-neon" /> {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-steel">{active.bio}</p>
              <button
                onClick={bookSession}
                className="mt-6 w-full rounded-md bg-neon py-3 font-heading text-sm font-bold text-charcoal hover:bg-neon-dark"
              >
                احجز جلسة خاصة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
