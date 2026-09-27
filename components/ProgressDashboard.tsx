'use client';

import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Flame, Trophy, Award, Weight, Ruler, Plus } from 'lucide-react';
import { readStorage, writeStorage, STORAGE_KEYS } from '@/lib/storage';
import { SessionLog, BodyMeasurement } from '@/lib/types';
import { useToast } from './NotificationSystem';

const badgeDefs = [
  { id: 'first', label: 'أول جلسة', icon: Flame, test: (n: number, vol: number) => n >= 1 },
  { id: 'streak10', label: '١٠ جلسات متتالية', icon: Trophy, test: (n: number) => n >= 10 },
  { id: 'vol1000', label: '١٠٠٠ كغ إجمالي', icon: Award, test: (_: number, vol: number) => vol >= 1000 },
  { id: 'addict30', label: 'مدمن صالة (٣٠ جلسة)', icon: Trophy, test: (n: number) => n >= 30 },
];

export default function ProgressDashboard() {
  const [sessions, setSessions] = useState<SessionLog[]>([]);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [form, setForm] = useState({ weight: '', bodyFat: '', waist: '', chest: '', arm: '' });
  const { notify } = useToast();

  useEffect(() => {
    setSessions(readStorage<SessionLog[]>(STORAGE_KEYS.sessions, []));
    setMeasurements(readStorage<BodyMeasurement[]>(STORAGE_KEYS.measurements, []));
  }, []);

  const thisMonthSessions = useMemo(() => {
    const now = new Date();
    return sessions.filter((s) => {
      const d = new Date(s.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [sessions]);

  const totalVolume = sessions.reduce((sum, s) => sum + s.totalVolume, 0);

  const streak = useMemo(() => {
    if (sessions.length === 0) return 0;
    const days = Array.from(new Set(sessions.map((s) => new Date(s.date).toDateString())));
    return days.length;
  }, [sessions]);

  const chartData = sessions.slice(-8).map((s, i) => ({
    name: `ج${i + 1}`,
    حجم: s.totalVolume,
  }));

  const addMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.weight) {
      notify('يرجى إدخال الوزن على الأقل', 'info');
      return;
    }
    const newM: BodyMeasurement = {
      date: new Date().toISOString(),
      weight: Number(form.weight),
      bodyFat: form.bodyFat ? Number(form.bodyFat) : undefined,
      waist: form.waist ? Number(form.waist) : undefined,
      chest: form.chest ? Number(form.chest) : undefined,
      arm: form.arm ? Number(form.arm) : undefined,
    };
    const updated = [...measurements, newM];
    setMeasurements(updated);
    writeStorage(STORAGE_KEYS.measurements, updated);
    setForm({ weight: '', bodyFat: '', waist: '', chest: '', arm: '' });
    notify('تم حفظ القياسات');
  };

  const weightData = measurements.map((m, i) => ({ name: `#${i + 1}`, الوزن: m.weight }));

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-steel/15 bg-white p-6 dark:bg-charcoal-light">
          <p className="text-sm text-steel">جلسات هذا الشهر</p>
          <p className="mt-2 font-heading text-4xl font-black text-charcoal dark:text-paper">
            {thisMonthSessions.length}
          </p>
        </div>
        <div className="rounded-xl border border-steel/15 bg-white p-6 dark:bg-charcoal-light">
          <p className="text-sm text-steel">إجمالي حجم التدريب</p>
          <p className="mt-2 font-heading text-4xl font-black text-charcoal dark:text-paper">
            {totalVolume.toLocaleString('ar-EG')} <span className="text-lg text-steel">كغ</span>
          </p>
        </div>
        <div className="rounded-xl border border-steel/15 bg-white p-6 dark:bg-charcoal-light">
          <p className="text-sm text-steel">أيام الالتزام</p>
          <p className="mt-2 font-heading text-4xl font-black text-charcoal dark:text-paper">{streak}</p>
        </div>
      </div>

      <div className="rounded-xl border border-steel/15 bg-white p-6 dark:bg-charcoal-light">
        <h3 className="font-heading font-bold text-charcoal dark:text-paper">التقدم عبر آخر الجلسات</h3>
        <div className="mt-4 h-64">
          {chartData.length === 0 ? (
            <p className="flex h-full items-center justify-center text-sm text-steel">
              سجّل جلستك الأولى ليظهر الرسم البياني هنا.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b728033" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: 8, border: '1px solid #6b728033' }} />
                <Line type="monotone" dataKey="حجم" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-charcoal dark:text-paper">الإنجازات</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {badgeDefs.map((b) => {
            const unlocked = b.test(sessions.length, totalVolume);
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`flex flex-col items-center rounded-xl border p-5 text-center ${
                  unlocked ? 'border-neon bg-neon/5' : 'border-steel/15 opacity-50'
                }`}
              >
                <Icon className={`h-7 w-7 ${unlocked ? 'text-neon' : 'text-steel'}`} />
                <p className="mt-2 text-xs font-bold text-charcoal dark:text-paper">{b.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-charcoal dark:text-paper">سجل آخر ١٠ جلسات</h3>
        {sessions.length === 0 ? (
          <p className="mt-3 text-sm text-steel">لا توجد جلسات مسجلة بعد.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-steel/15">
            <table className="w-full text-sm">
              <thead className="bg-steel/5 text-steel">
                <tr>
                  <th className="px-4 py-3 text-right font-medium">الروتين</th>
                  <th className="px-4 py-3 text-right font-medium">التاريخ</th>
                  <th className="px-4 py-3 text-right font-medium">الحجم</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(-10).reverse().map((s) => (
                  <tr key={s.id} className="border-t border-steel/10">
                    <td className="px-4 py-3 font-bold text-charcoal dark:text-paper">{s.routineName}</td>
                    <td className="px-4 py-3 text-steel">{new Date(s.date).toLocaleDateString('ar-EG')}</td>
                    <td className="px-4 py-3 text-steel">{s.totalVolume} كغ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-heading font-bold text-charcoal dark:text-paper">قياسات الجسم</h3>
          <form onSubmit={addMeasurement} className="mt-4 grid grid-cols-2 gap-3">
            {[
              { key: 'weight', label: 'الوزن (كغ)', icon: Weight },
              { key: 'bodyFat', label: 'نسبة الدهون %', icon: Ruler },
              { key: 'waist', label: 'محيط الخصر (سم)', icon: Ruler },
              { key: 'chest', label: 'محيط الصدر (سم)', icon: Ruler },
              { key: 'arm', label: 'محيط الذراع (سم)', icon: Ruler },
            ].map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-xs text-steel">{f.label}</label>
                <input
                  type="number"
                  value={(form as any)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-md border border-steel/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-neon"
                />
              </div>
            ))}
            <button
              type="submit"
              className="col-span-2 mt-1 flex items-center justify-center gap-1.5 rounded-md bg-neon py-2.5 text-sm font-bold text-charcoal hover:bg-neon-dark"
            >
              <Plus className="h-4 w-4" /> حفظ القياسات
            </button>
          </form>
        </div>
        <div>
          <h3 className="font-heading font-bold text-charcoal dark:text-paper">تطور الوزن</h3>
          <div className="mt-4 h-52">
            {weightData.length === 0 ? (
              <p className="flex h-full items-center justify-center text-sm text-steel">
                أضف قياساً ليظهر الرسم البياني.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6b728033" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ direction: 'rtl', borderRadius: 8, border: '1px solid #6b728033' }} />
                  <Line type="monotone" dataKey="الوزن" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
