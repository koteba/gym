import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import TrainersPreview from '@/components/TrainersPreview';
import ClassSchedule from '@/components/ClassSchedule';
import PricingPlans from '@/components/PricingPlans';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Gallery />
      <TrainersPreview />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper">
          جدول الحصص الأسبوعي
        </h2>
        <div className="mt-8">
          <ClassSchedule compact />
        </div>
      </section>
      <Testimonials />
      <PricingPlans />
    </>
  );
}
