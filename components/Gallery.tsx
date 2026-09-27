'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const photos = [
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop', alt: 'صالة الأوزان الحرة' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop', alt: 'صالة الكارديو' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop', alt: 'منطقة الكروسفت' },
  { src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop', alt: 'استوديو اليوغا' },
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % photos.length);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h2 className="font-heading text-3xl font-extrabold text-charcoal dark:text-paper">
        داخل النادي
      </h2>
      <div className="relative mt-8 overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${index * 100}%)` }}
        >
          {photos.map((p) => (
            <div key={p.src} className="relative aspect-[16/9] w-full shrink-0">
              <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <button
          onClick={prev}
          aria-label="الصورة السابقة"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-charcoal/60 p-2 text-paper backdrop-blur hover:bg-neon hover:text-charcoal"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="الصورة التالية"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-charcoal/60 p-2 text-paper backdrop-blur hover:bg-neon hover:text-charcoal"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`الانتقال إلى الصورة ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-neon' : 'w-1.5 bg-paper/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
