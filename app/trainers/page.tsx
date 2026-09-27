import TrainersGrid from '@/components/TrainersGrid';

export default function TrainersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper sm:text-4xl">
        المدربون
      </h1>
      <p className="mt-2 max-w-xl text-steel">فريق محترف، شهادات معتمدة، وخبرة ميدانية طويلة.</p>
      <div className="mt-10">
        <TrainersGrid />
      </div>
    </div>
  );
}
