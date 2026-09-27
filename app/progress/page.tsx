import ProgressDashboard from '@/components/ProgressDashboard';

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper sm:text-4xl">
        تقدمي
      </h1>
      <p className="mt-2 max-w-xl text-steel">الأرقام لا تكذب — تابع كل جلسة، كل كيلوغرام، وكل إنجاز.</p>
      <div className="mt-10">
        <ProgressDashboard />
      </div>
    </div>
  );
}
