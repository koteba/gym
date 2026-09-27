import MembershipPlans from '@/components/MembershipPlans';

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper sm:text-4xl">
        العضويات
      </h1>
      <p className="mt-2 max-w-xl text-steel">
        اختر الباقة المناسبة لالتزامك، وسجّل بياناتك لتفعيل عضويتك فوراً.
      </p>
      <div className="mt-10">
        <MembershipPlans />
      </div>
    </div>
  );
}
