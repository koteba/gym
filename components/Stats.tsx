const stats = [
  { value: '٢٤٠٠+', label: 'عضو نشط' },
  { value: '١٨', label: 'مدرب محترف' },
  { value: '١٦', label: 'ساعة يومياً' },
  { value: '٤.٨/٥', label: 'تقييم الأعضاء' },
];

export default function Stats() {
  return (
    <section className="border-b border-steel/15 bg-white dark:bg-charcoal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-right">
            <p className="font-heading text-4xl font-black text-charcoal dark:text-paper sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-steel">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
