import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';
import { Container, Eyebrow } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Contact Us' };

const icons = {
  location: <path d="M12 21s-7-6.2-7-11.5a7 7 0 1114 0C19 14.8 12 21 12 21zm0-8.5a3 3 0 100-6 3 3 0 000 6z" />,
  email: <path d="M3 6h18v12H3zM3 6l9 7 9-7" />,
  phone: <path d="M21 3L3 10.5l7 2.5m11-10l-4.5 18-6.5-8m11-10L10 13" />,
};

function InfoCard({ icon, gradient, title, children }: { icon: keyof typeof icons; gradient: string; title: string; children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded bg-white px-8 pt-14 pb-10 text-center shadow-[0_20px_60px_-10px_rgba(31,31,31,0.12)]">
      <div className={`absolute -top-8 left-1/2 flex size-16 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-lg ${gradient}`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
          {icons[icon]}
        </svg>
      </div>
      <h3 className="mb-3 text-xl">{title}</h3>
      <div className="space-y-2 leading-relaxed">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />
      <section className="py-24 lg:py-32">
        <Container className="grid gap-20 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-16 pt-8">
            <InfoCard icon="location" gradient="bg-linear-to-br from-[#ff2e63] to-[#a813c9]" title="Our Location">
              <p>{site.address}</p>
            </InfoCard>
            <InfoCard icon="email" gradient="bg-linear-to-br from-[#5d3ef5] to-[#9c1df0]" title="Email Address">
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </InfoCard>
            <InfoCard icon="phone" gradient="bg-linear-to-br from-[#ffa800] to-[#ff2e86]" title="Phone">
              {site.phones.map((phone) => (
                <p key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary">
                    {phone}
                  </a>
                </p>
              ))}
            </InfoCard>
          </div>
          <div>
            <Eyebrow pill>Send Us Message</Eyebrow>
            <h2 className="mb-8 max-w-md text-4xl">Have Any Questions? Let’s Start to Talk</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
