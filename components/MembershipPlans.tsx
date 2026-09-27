'use client';

import { useEffect, useState } from 'react';
import { Check, ShieldCheck, CalendarClock } from 'lucide-react';
import { plans } from '@/lib/data';
import { readStorage, writeStorage, STORAGE_KEYS } from '@/lib/storage';
import { Membership } from '@/lib/types';
import { useToast } from './NotificationSystem';

export default function MembershipPlans() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[1].id);
  const [form, setForm] = useState({ name: '', phone: '', goal: '' });
  const { notify } = useToast();

  useEffect(() => {
    setMembership(readStorage<Membership | null>(STORAGE_KEYS.membership, null));
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      notify('يرجى إدخال الاسم ورقم الهاتف', 'info');
      return;
    }
    const newMembership: Membership = {
      name: form.name,
      phone: form.phone,
      goal: form.goal || 'لياقة عامة',
      planId: selectedPlan,
      startDate: new Date().toISOString(),
      status: 'نشطة',
    };
    writeStorage(STORAGE_KEYS.membership, newMembership);
    setMembership(newMembership);
    notify('تم تفعيل عضويتك بنجاح 🎉');
  };

  if (membership) {
    const plan = plans.find((p) => p.id === membership.planId);
    const start = new Date(membership.startDate);
    const renewal = new Date(start);
    renewal.setMonth(renewal.getMonth() + (plan?.id === 'p3' ? 12 : plan?.id === 'p2' ? 3 : 1));

    return (
      <div className="mx-auto max-w-xl rounded-xl border border-steel/15 bg-white p-8 dark:bg-charcoal-light">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neon/15 text-neon">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="font-heading text-lg font-bold text-charcoal dark:text-paper">{membership.name}</p>
            <p className="text-sm text-neon">عضوية {membership.status}</p>
          </div>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between border-b border-steel/10 pb-2">
            <dt className="text-steel">الباقة</dt>
            <dd className="font-bold text-charcoal dark:text-paper">{plan?.name}</dd>
          </div>
          <div className="flex justify-between border-b border-steel/10 pb-2">
            <dt className="text-steel">الهدف</dt>
            <dd className="font-bold text-charcoal dark:text-paper">{membership.goal}</dd>
          </div>
          <div className="flex justify-between border-b border-steel/10 pb-2">
            <dt className="flex items-center gap-1 text-steel"><CalendarClock className="h-4 w-4" /> تاريخ التجديد</dt>
            <dd className="font-bold text-charcoal dark:text-paper">
              {renewal.toLocaleDateString('ar-EG')}
            </dd>
          </div>
        </dl>
        <button
          onClick={() => {
            writeStorage(STORAGE_KEYS.membership, null);
            setMembership(null);
          }}
          className="mt-6 w-full rounded-md border border-steel/30 py-2.5 text-sm font-bold text-steel hover:border-red-400 hover:text-red-400"
        >
          إلغاء العضوية
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlan(p.id)}
            className={`rounded-xl border p-5 text-right transition-colors ${
              selectedPlan === p.id
                ? 'border-neon bg-neon/5'
                : 'border-steel/15 hover:border-steel/30'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <p className="font-heading font-bold text-charcoal dark:text-paper">{p.name}</p>
              <p className="font-heading text-xl font-black text-charcoal dark:text-paper">${p.price}</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-steel">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-neon" /> {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="rounded-xl border border-steel/15 bg-white p-7 dark:bg-charcoal-light">
        <h3 className="font-heading text-lg font-bold text-charcoal dark:text-paper">تسجيل عضوية جديدة</h3>
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-steel">الاسم الكامل</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
              placeholder="مثال: يارا خليل"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-steel">رقم الهاتف</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
              placeholder="٧٠ ١٢٣ ٤٥٦"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-steel">هدفك</label>
            <input
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="w-full rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
              placeholder="مثال: خسارة وزن، بناء عضلات..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-neon py-3 font-heading text-sm font-bold text-charcoal hover:bg-neon-dark"
          >
            تفعيل العضوية
          </button>
        </div>
      </form>
    </div>
  );
}
