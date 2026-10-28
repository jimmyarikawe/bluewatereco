import type { Metadata } from 'next';
import Image from 'next/image';
import Newsletter from '@/components/Newsletter';
import PageHero from '@/components/PageHero';
import { GoalsImpact, ServicesGrid } from '@/components/Sections';
import { Container } from '@/components/ui';

export const metadata: Metadata = { title: 'About Us' };

const gallery = [
  { src: '/images/about-1.jpeg', alt: 'Worker beside stacked plastic bales', className: 'mt-10' },
  { src: '/images/about-3.jpeg', alt: 'Recycling plant conveyor', className: '' },
  { src: '/images/mission-2.jpg', alt: 'Compressed plastic bales', className: '' },
  { src: '/images/about-4.jpg', alt: 'Plastic waste at a dump site', className: '-mt-10' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" />

      <section className="py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className={`aspect-[3/2] w-full rounded-lg object-cover ${img.className}`}
              />
            ))}
          </div>
          <div className="space-y-5 leading-[1.9]">
            <h2 className="text-4xl">About Bluewater Eco</h2>
            <p>
              Bluewater Eco is a plastic recycling company that focuses on transforming plastic waste into valuable resources. Founded in 2023, the
              company is driven by a strong commitment to combat plastic pollution and create a sustainable circular economy.
            </p>
            <p>
              Through our commitment to innovation and sustainable practices, Bluewater Eco strives to minimize waste in landfills, reduce carbon
              emissions, and provide sustainable jobs.
            </p>
            <p>
              With a dedicated team of environmentally-conscious professionals, we are at the forefront of the recycling industry, fostering a cleaner
              and greener future for generations to come.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-gray-100 py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="space-y-5 leading-[1.9] lg:px-6">
            <h2 className="text-4xl">Our Vision 🚀</h2>
            <p>
              Our vision is to be a global leader in plastic recycling, driving the transformation towards a circular economy and fostering a world free
              from plastic pollution.
            </p>
            <p>
              Our commitment is to create a sustainable future where every piece of plastic waste is a valuable resource and never ends up in landfills
              or oceans.
            </p>
          </div>
          <Image src="/images/about-banner.jpg" alt="Illuminated recycled-plastic tunnel" width={1200} height={930} className="h-auto w-full" />
        </Container>
      </section>

      <GoalsImpact />
      <ServicesGrid />
      <Newsletter />
    </>
  );
}
