import WorkoutTracker from '@/components/WorkoutTracker';

export default function WorkoutsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper sm:text-4xl">
        تتبع التمارين
      </h1>
      <p className="mt-2 max-w-xl text-steel">تصفّح المكتبة، ابنِ روتينك، وسجّل كل جلسة بدقة.</p>
      <div className="mt-10">
        <WorkoutTracker />
      </div>
    </div>
  );
}
