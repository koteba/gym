'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

function classify(bmi: number) {
  if (bmi < 18.5) return { label: 'نحافة', color: 'text-sky-500', tip: 'يُنصح بزيادة السعرات ضمن نظام غذائي متوازن وتمارين مقاومة.' };
  if (bmi < 25) return { label: 'طبيعي', color: 'text-neon', tip: 'حافظ على نشاطك ونظامك الغذائي الحالي.' };
  if (bmi < 30) return { label: 'زيادة وزن', color: 'text-amber-500', tip: 'يُنصح بدمج الكارديو مع تمارين المقاومة وضبط السعرات.' };
  return { label: 'سمنة', color: 'text-red-500', tip: 'يُفضّل استشارة مختص تغذية ومدرب لوضع خطة تدريجية وآمنة.' };
}

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;
    setResult(Number((w / (h * h)).toFixed(1)));
  };

  const info = result !== null ? classify(result) : null;

  return (
    <div className="mx-auto max-w-lg rounded-xl border border-steel/15 bg-white p-8 dark:bg-charcoal-light">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neon/15 text-neon">
          <Calculator className="h-6 w-6" />
        </span>
        <h3 className="font-heading text-lg font-bold text-charcoal dark:text-paper">حاسبة مؤشر كتلة الجسم</h3>
      </div>
      <form onSubmit={calculate} className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm text-steel">الوزن (كغ)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
            placeholder="70"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-steel">الطول (سم)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-md border border-steel/25 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-neon"
            placeholder="175"
          />
        </div>
        <button
          type="submit"
          className="col-span-2 rounded-md bg-neon py-3 font-heading text-sm font-bold text-charcoal hover:bg-neon-dark"
        >
          احسب المؤشر
        </button>
      </form>

      {result !== null && info && (
        <div className="mt-6 rounded-lg border border-steel/15 p-5 text-center">
          <p className="font-heading text-5xl font-black text-charcoal dark:text-paper">{result}</p>
          <p className={`mt-1 font-heading font-bold ${info.color}`}>{info.label}</p>
          <p className="mt-3 text-sm leading-relaxed text-steel">{info.tip}</p>
        </div>
      )}
    </div>
  );
}
