import BMICalculator from '@/components/BMICalculator';

export default function BMIPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-center font-heading text-3xl font-extrabold text-charcoal dark:text-paper sm:text-4xl">
        حاسبة مؤشر كتلة الجسم
      </h1>
      <p className="mx-auto mt-2 max-w-md text-center text-steel">
        أداة سريعة لتقدير حالتك الصحية العامة كنقطة انطلاق فقط.
      </p>
      <div className="mt-10">
        <BMICalculator />
      </div>
    </div>
  );
}
