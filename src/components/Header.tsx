'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Home and blog posts have a dark photo hero, so the header starts transparent with white links
  const overDarkHero = pathname === '/' || pathname.startsWith('/blog/');
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const linkColor = solid || !overDarkHero ? 'text-headline hover:text-primary' : 'text-white hover:text-white/75';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className={`mx-auto flex max-w-325 items-center justify-between px-5 transition-all duration-300 ${solid ? 'h-20' : 'h-24 lg:h-28'}`}>
        <Link href="/" aria-label="Bluewater Eco home">
          <Image src="/images/logo-wordmark.png" alt="Bluewater Eco" width={523} height={134} priority
            className={`h-8 w-auto lg:h-9 ${solid || !overDarkHero ? '' : 'brightness-0 invert'}`}
          />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-12">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-bold transition-colors ${linkColor} ${isActive(item.href) && (solid || !overDarkHero) ? 'text-primary!' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`lg:hidden ${solid || !overDarkHero ? 'text-headline' : 'text-white'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white lg:hidden">
          <ul className="flex flex-col px-5 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-lg font-bold ${isActive(item.href) ? 'text-primary' : 'text-headline'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
