import { Star } from 'lucide-react';

const items = [
  { name: 'رامي عيسى', text: 'خسرت ١٢ كيلو خلال ٤ أشهر بفضل متابعة المدربين وتتبع التمارين اليومي.', rating: 5 },
  { name: 'نور فارس', text: 'حصص اليوغا مع سارة غيّرت علاقتي بجسمي تماماً. مكان هادئ رغم الطاقة العالية.', rating: 5 },
  { name: 'أحمد ديب', text: 'لوحة التقدم تخليني ألتزم — رؤية الأرقام كل أسبوع دافع ما بينوصف.', rating: 4 },
];

export default function Testimonials() {
  return (
    <section className="bg-paper-muted dark:bg-charcoal-light">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper">
          كلام الأعضاء، لا كلامنا
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="rounded-xl border border-steel/15 bg-white p-6 dark:bg-charcoal">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? 'fill-neon text-neon' : 'text-steel/30'}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-steel">{t.text}</p>
              <p className="mt-4 font-heading text-sm font-bold text-charcoal dark:text-paper">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
