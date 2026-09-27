import Link from 'next/link';
import Image from 'next/image';
import { trainers } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

export default function TrainersPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <h2 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper">
          مدربون يعرفون طريقك
        </h2>
        <Link href="/trainers" className="hidden items-center gap-1 text-sm font-bold text-neon sm:flex">
          كل المدربين <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((t) => (
          <div key={t.id} className="group overflow-hidden rounded-xl border border-steel/15">
            <div className="relative h-56 w-full">
              <Image src={t.image} alt={t.name} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="bg-white p-4 dark:bg-charcoal">
              <p className="font-heading font-bold text-charcoal dark:text-paper">{t.name}</p>
              <p className="text-sm text-neon">{t.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
