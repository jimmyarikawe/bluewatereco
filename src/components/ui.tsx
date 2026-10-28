import Link from 'next/link';

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type ButtonProps = { href: string; children: React.ReactNode; variant?: 'primary' | 'outline' | 'link' };

export function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const styles = {
    primary: 'rounded-full bg-primary px-9 py-4 text-white shadow-lg shadow-primary/20 hover:bg-primary-dark',
    outline: 'rounded-full border border-gray-200 bg-white px-9 py-4 text-headline hover:border-primary hover:text-primary',
    link: 'border-b-2 border-white pb-1.5 text-white hover:border-white/60',
  }[variant];
  return (
    <Link href={href} className={`inline-flex items-center gap-3 text-sm font-bold transition-colors ${styles}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Eyebrow({ children, pill = false }: { children: React.ReactNode; pill?: boolean }) {
  return pill ? (
    <span className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary">{children}</span>
  ) : (
    <h5 className="mb-4 text-sm text-primary">{children}</h5>
  );
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-325 px-5 ${className}`}>{children}</div>;
}
