import Link from 'next/link';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-steel/15 bg-charcoal text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-heading text-xl font-extrabold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neon text-charcoal">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            قوّة
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-light/80">
            نادٍ رياضي مبني حول فكرة واحدة: تقدّمك يُقاس، لا يُخمَّن.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold text-paper">روابط سريعة</h3>
          <ul className="mt-4 space-y-2 text-sm text-steel-light/80">
            <li><Link href="/membership" className="hover:text-neon">العضويات</Link></li>
            <li><Link href="/classes" className="hover:text-neon">حجز الحصص</Link></li>
            <li><Link href="/trainers" className="hover:text-neon">المدربون</Link></li>
            <li><Link href="/workouts" className="hover:text-neon">تتبع التمارين</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold text-paper">تواصل معنا</h3>
          <ul className="mt-4 space-y-3 text-sm text-steel-light/80">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-neon" /> بيروت، لبنان</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-neon" /> ٠١٢٣٤٥٦٧٨٩</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-neon" /> info@qowa.club</li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold text-paper">تابعنا</h3>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-steel/30 text-steel-light transition-colors hover:border-neon hover:text-neon"
                aria-label="social link"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-steel/15 py-5 text-center text-xs text-steel-light/60">
        © {new Date().getFullYear()} قوّة. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
