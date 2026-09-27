'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-l from-charcoal/40 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6"
      >
        <p className="font-heading text-lg font-bold text-neon">نادي قوّة الرياضي</p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-black leading-[1.1] text-paper sm:text-6xl">
          الجسم يتغيّر حين يتوقف الجسد عن التفاوض
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-steel-light/90 sm:text-lg">
          برنامج تدريب، مدربون محترفون، وأدوات تتبّع حقيقية — كل ما تحتاجه لتحويل النية إلى نتيجة مقاسة بالأرقام.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/membership"
            className="group flex items-center gap-2 rounded-md bg-neon px-6 py-3.5 font-heading text-sm font-bold text-charcoal transition-transform hover:scale-[1.03]"
          >
            ابدأ تجربتك المجانية
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            href="/classes"
            className="rounded-md border border-paper/25 px-6 py-3.5 font-heading text-sm font-bold text-paper transition-colors hover:border-neon hover:text-neon"
          >
            تصفّح جدول الحصص
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
