import Image from 'next/image';
import { goals, products, services } from '@/lib/site';
import { Container } from './ui';

export function GoalsImpact() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <Image src="/images/goals-bg.png" alt="" fill className="object-cover opacity-60" sizes="100vw" />
      <Container className="relative">
        <h2 className="mb-16 text-center text-4xl text-white">Our Goals &amp; Impact</h2>
        <div className="grid gap-12 sm:grid-cols-3">
          {goals.map((g) => (
            <div key={g.title} className="flex flex-col items-center text-center">
              <Image src={g.icon} alt="" width={96} height={96} className="mb-4 size-24" />
              <h5 className="max-w-36 text-base font-medium text-white">{g.title}</h5>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-24">
      <Container>
        <h2 className="mb-16 text-center text-4xl">Our Services &amp; Processes</h2>
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="rounded-xl bg-white p-9 shadow-[0_20px_60px_-15px_rgba(31,67,134,0.15)]">
              <Image src={s.icon} alt="" width={64} height={64} className="mb-8 size-16" />
              <h3 className="mb-4 text-xl">{s.title}</h3>
              <p className="leading-[1.9]">{s.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Products() {
  return (
    <section className="pb-24">
      <Container>
        <h2 className="mb-16 text-center text-4xl">Our Products</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <article key={p.title} className="flex gap-8 rounded-xl border border-gray-100 p-10">
              <Image src={p.icon} alt="" width={64} height={64} className="size-16 shrink-0" />
              <div>
                <h3 className="mb-4 text-xl">{p.title}</h3>
                <p className="leading-[1.9]">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
