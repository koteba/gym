'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Moon, Sun, Dumbbell } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/membership', label: 'العضويات' },
  { href: '/classes', label: 'الحصص' },
  { href: '/workouts', label: 'التمارين' },
  { href: '/progress', label: 'تقدمي' },
  { href: '/trainers', label: 'المدربون' },
  { href: '/bmi', label: 'حاسبة BMI' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-steel/15 bg-white/90 backdrop-blur dark:bg-charcoal/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neon text-charcoal">
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </span>
          قوّة
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'text-neon'
                  : 'text-steel hover:text-charcoal dark:hover:text-paper'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="تبديل الوضع الليلي"
            className="rounded-md p-2 text-steel transition-colors hover:bg-steel/10"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
            className="rounded-md p-2 text-steel transition-colors hover:bg-steel/10 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-steel/15 px-4 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname === l.href ? 'text-neon' : 'text-steel'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
