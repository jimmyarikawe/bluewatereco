import Link from 'next/link';
import { Container } from './ui';

export default function PageHero({ title }: { title: string }) {
  return (
    <section className="bg-linear-to-r from-[#c9e6e7] via-[#e7eff0] to-[#f8f0ef] pt-40 pb-20 lg:pt-44 lg:pb-24">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>›</span>
          <span className="text-headline">{title}</span>
        </nav>
        <h1 className="text-5xl text-dark sm:text-6xl lg:text-7xl">{title}</h1>
      </Container>
    </section>
  );
}
