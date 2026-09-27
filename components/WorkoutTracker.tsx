'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { exercises } from '@/lib/data';
import { readStorage, writeStorage, STORAGE_KEYS } from '@/lib/storage';
import { Routine, RoutineExercise, SessionLog, SetLog, Difficulty } from '@/lib/types';
import { useToast } from './NotificationSystem';

const muscles = ['الكل', 'صدر', 'ظهر', 'أرجل', 'أكتاف', 'ذراعين', 'Core'] as const;
const difficultyColor: Record<Difficulty, string> = {
  مبتدئ: 'bg-neon/15 text-neon',
  متوسط: 'bg-steel/15 text-steel',
  متقدم: 'bg-charcoal text-paper dark:bg-paper dark:text-charcoal',
};

function RestTimer() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds === 0) return;
    const t = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(t);
  }, [running, seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="flex items-center gap-3 rounded-lg border border-steel/20 px-4 py-2.5">
      <Timer className="h-4 w-4 text-neon" />
      <span className="font-heading text-lg font-bold tabular-nums text-charcoal dark:text-paper">
        {mm}:{ss}
      </span>
      <button onClick={() => setRunning((r) => !r)} className="text-steel hover:text-neon">
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(60); }} className="text-steel hover:text-neon">
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function WorkoutTracker() {
  const [tab, setTab] = useState<'library' | 'routine' | 'log'>('library');
  const [muscle, setMuscle] = useState<(typeof muscles)[number]>('الكل');
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [draft, setDraft] = useState<RoutineExercise[]>([]);
  const [routineName, setRoutineName] = useState('');
  const [activeRoutine, setActiveRoutine] = useState<string>('');
  const [logSets, setLogSets] = useState<Record<string, SetLog[]>>({});
  const { notify } = useToast();

  useEffect(() => {
    setRoutines(readStorage<Routine[]>(STORAGE_KEYS.routines, []));
  }, []);

  const filtered = muscle === 'الكل' ? exercises : exercises.filter((e) => e.muscle === muscle);

  const addToDraft = (exerciseId: string) => {
    if (draft.some((d) => d.exerciseId === exerciseId)) return;
    setDraft([...draft, { exerciseId, sets: 3, reps: 10 }]);
  };

  const saveRoutine = () => {
    if (!routineName || draft.length === 0) {
      notify('أدخل اسم الروتين وأضف تمريناً واحداً على الأقل', 'info');
      return;
    }
    const newRoutine: Routine = { id: crypto.randomUUID(), name: routineName, exercises: draft };
    const updated = [...routines, newRoutine];
    setRoutines(updated);
    writeStorage(STORAGE_KEYS.routines, updated);
    setDraft([]);
    setRoutineName('');
    notify('تم حفظ الروتين بنجاح');
  };

  const deleteRoutine = (id: string) => {
    const updated = routines.filter((r) => r.id !== id);
    setRoutines(updated);
    writeStorage(STORAGE_KEYS.routines, updated);
  };

  const currentRoutine = routines.find((r) => r.id === activeRoutine);

  const updateSet = (exerciseId: string, idx: number, field: keyof SetLog, value: number) => {
    setLogSets((prev) => {
      const sets = prev[exerciseId] ? [...prev[exerciseId]] : [];
      sets[idx] = { ...sets[idx], [field]: value };
      return { ...prev, [exerciseId]: sets };
    });
  };

  const totalVolume = useMemo(() => {
    return Object.values(logSets).reduce(
      (sum, sets) => sum + sets.reduce((s, set) => s + (set.weight || 0) * (set.reps || 0), 0),
      0
    );
  }, [logSets]);

  const saveSession = () => {
    if (!currentRoutine) {
      notify('اختر روتيناً أولاً', 'info');
      return;
    }
    const sessions = readStorage<SessionLog[]>(STORAGE_KEYS.sessions, []);
    const newSession: SessionLog = {
      id: crypto.randomUUID(),
      routineId: currentRoutine.id,
      routineName: currentRoutine.name,
      date: new Date().toISOString(),
      sets: Object.entries(logSets).map(([exerciseId, logs]) => ({ exerciseId, logs })),
      totalVolume,
    };
    writeStorage(STORAGE_KEYS.sessions, [...sessions, newSession]);
    setLogSets({});
    notify(`تم حفظ الجلسة — حجم إجمالي ${totalVolume} كغ 💪`);
  };

  return (
    <div>
      <div className="flex gap-2 border-b border-steel/15">
        {[
          { id: 'library', label: 'مكتبة التمارين' },
          { id: 'routine', label: 'بناء روتين' },
          { id: 'log', label: 'تسجيل جلسة' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              tab === t.id ? 'border-neon text-neon' : 'border-transparent text-steel'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'library' && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {muscles.map((m) => (
              <button
                key={m}
                onClick={() => setMuscle(m)}
                className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                  muscle === m ? 'bg-neon text-charcoal' : 'bg-steel/10 text-steel hover:bg-steel/20'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <div key={e.id} className="overflow-hidden rounded-xl border border-steel/15">
                <div className="relative h-40 w-full">
                  <Image src={e.image} alt={e.nameEn} fill sizes="360px" className="object-cover" />
                </div>
                <div className="bg-white p-4 dark:bg-charcoal-light">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading font-bold text-charcoal dark:text-paper">{e.name}</p>
                      <p className="text-xs text-steel">{e.nameEn}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${difficultyColor[e.difficulty]}`}>
                      {e.difficulty}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-steel">{e.description}</p>
                  <button
                    onClick={() => addToDraft(e.id)}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-neon/50 py-2 text-xs font-bold text-neon hover:bg-neon/10"
                  >
                    <Plus className="h-3.5 w-3.5" /> أضف للروتين
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'routine' && (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-heading font-bold text-charcoal dark:text-paper">الروتين الحالي</h3>
            {draft.length === 0 ? (
              <p className="mt-3 text-sm text-steel">أضف تمارين من مكتبة التمارين لبناء روتينك.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {draft.map((d, i) => {
                  const ex = exercises.find((e) => e.id === d.exerciseId)!;
                  return (
                    <div key={d.exerciseId} className="flex items-center justify-between rounded-lg border border-steel/15 p-3">
                      <p className="text-sm font-bold text-charcoal dark:text-paper">{ex.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <input
                          type="number"
                          value={d.sets}
                          onChange={(e) => {
                            const next = [...draft];
                            next[i] = { ...next[i], sets: Number(e.target.value) };
                            setDraft(next);
                          }}
                          className="w-14 rounded border border-steel/25 bg-transparent px-2 py-1 text-center"
                        />
                        <span className="text-steel">مجموعات ×</span>
                        <input
                          type="number"
                          value={d.reps}
                          onChange={(e) => {
                            const next = [...draft];
                            next[i] = { ...next[i], reps: Number(e.target.value) };
                            setDraft(next);
                          }}
                          className="w-14 rounded border border-steel/25 bg-transparent px-2 py-1 text-center"
                        />
                        <span className="text-steel">تكرار</span>
                        <button onClick={() => setDraft(draft.filter((x) => x.exerciseId !== d.exerciseId))}>
                          <Trash2 className="h-4 w-4 text-steel hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <input
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  placeholder="اسم الروتين (مثال: يوم الدفع)"
                  className="w-full rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
                />
                <button
                  onClick={saveRoutine}
                  className="w-full rounded-md bg-neon py-2.5 text-sm font-bold text-charcoal hover:bg-neon-dark"
                >
                  حفظ الروتين
                </button>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-heading font-bold text-charcoal dark:text-paper">روتيناتي المحفوظة</h3>
            {routines.length === 0 ? (
              <p className="mt-3 text-sm text-steel">لا توجد روتينات محفوظة بعد.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {routines.map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-lg border border-steel/15 p-3">
                    <div>
                      <p className="text-sm font-bold text-charcoal dark:text-paper">{r.name}</p>
                      <p className="text-xs text-steel">{r.exercises.length} تمارين</p>
                    </div>
                    <button onClick={() => deleteRoutine(r.id)}>
                      <Trash2 className="h-4 w-4 text-steel hover:text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'log' && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={activeRoutine}
              onChange={(e) => { setActiveRoutine(e.target.value); setLogSets({}); }}
              className="rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
            >
              <option value="">اختر روتيناً</option>
              {routines.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <RestTimer />
          </div>

          {currentRoutine && (
            <div className="mt-6 space-y-6">
              {currentRoutine.exercises.map((re) => {
                const ex = exercises.find((e) => e.id === re.exerciseId)!;
                const sets = logSets[re.exerciseId] || Array.from({ length: re.sets }, () => ({ weight: 0, reps: re.reps }));
                return (
                  <div key={re.exerciseId} className="rounded-xl border border-steel/15 p-4">
                    <p className="font-heading font-bold text-charcoal dark:text-paper">{ex.name}</p>
                    <div className="mt-3 space-y-2">
                      {sets.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <span className="w-16 text-steel">مجموعة {idx + 1}</span>
                          <input
                            type="number"
                            value={s.weight}
                            onChange={(e) => updateSet(re.exerciseId, idx, 'weight', Number(e.target.value))}
                            placeholder="الوزن (كغ)"
                            className="w-24 rounded border border-steel/25 bg-transparent px-2 py-1.5 text-center"
                          />
                          <span className="text-steel">كغ ×</span>
                          <input
                            type="number"
                            value={s.reps}
                            onChange={(e) => updateSet(re.exerciseId, idx, 'reps', Number(e.target.value))}
                            placeholder="تكرار"
                            className="w-20 rounded border border-steel/25 bg-transparent px-2 py-1.5 text-center"
                          />
                          <span className="text-steel">تكرار</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between rounded-xl bg-charcoal p-5 text-paper">
                <p className="font-heading font-bold">الحجم الإجمالي</p>
                <p className="font-heading text-2xl font-black text-neon">{totalVolume} كغ</p>
              </div>
              <button
                onClick={saveSession}
                className="w-full rounded-md bg-neon py-3 font-heading text-sm font-bold text-charcoal hover:bg-neon-dark"
              >
                حفظ الجلسة
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
