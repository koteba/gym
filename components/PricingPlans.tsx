import Link from 'next/link';
import { Check } from 'lucide-react';
import { plans } from '@/lib/data';

export default function PricingPlans() {
  return (
    <section className="bg-paper-muted dark:bg-charcoal-light">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper">
          باقة تناسب التزامك
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col rounded-xl border p-7 ${
                p.highlight
                  ? 'border-neon bg-charcoal text-paper'
                  : 'border-steel/15 bg-white dark:bg-charcoal'
              }`}
            >
              <p className="font-heading text-lg font-bold">{p.name}</p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-black">${p.price}</span>
                <span className={p.highlight ? 'text-steel-light' : 'text-steel'}>/{p.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    <span className={p.highlight ? 'text-steel-light' : 'text-steel'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/membership"
                className={`mt-7 rounded-md py-2.5 text-center text-sm font-bold transition-colors ${
                  p.highlight
                    ? 'bg-neon text-charcoal hover:bg-neon-dark'
                    : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-charcoal'
                }`}
              >
                اختر هذه الباقة
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
