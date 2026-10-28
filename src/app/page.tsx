import Image from 'next/image';
import Newsletter from '@/components/Newsletter';
import { GoalsImpact } from '@/components/Sections';
import { Button, Container, Eyebrow } from '@/components/ui';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[92vh] max-h-240 min-h-150 items-center overflow-hidden bg-dark">
        <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="animate-ken-burns object-cover" />
        <div className="absolute inset-0 bg-linear-to-l from-[#09102342] to-[#040d22d9]" />
        <Container className="relative w-full pt-24">
          <h1 className="mb-8 max-w-xl text-[2.6rem] leading-[1.1] text-white sm:text-6xl lg:text-7xl">Driving Sustainable Living by Recycling</h1>
          <div className="flex flex-wrap items-center gap-8">
            <Button href="/contact-us">Contact Us</Button>
            <Button href="/about-us" variant="link">
              About Us
            </Button>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <Image
            src="/images/plant-conveyor.jpeg"
            alt="Plastic bottles on a conveyor at the Bluewater Eco recycling plant"
            width={1200}
            height={800}
            className="h-auto w-full lg:pr-6"
          />
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mb-6 text-4xl">About BlueWater Eco</h2>
            <p className="mb-8 leading-[1.9]">
              Bluewater Eco is a plastic recycling company that focuses on transforming plastic waste into valuable resources. Founded in 2023, the
              company is driven by a strong commitment to combat plastic pollution and create a sustainable circular economy.
            </p>
            <Button href="/about-us">Learn More</Button>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-dark py-24">
        <Image src="/images/about-4.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <Container className="relative text-center">
          <h2 className="mb-6 text-4xl text-white">Our Vision 🚀</h2>
          <p className="mx-auto max-w-3xl leading-[1.9] text-white/90">
            Our vision is to be a global leader in plastic recycling, driving the transformation towards a circular economy and fostering a world free
            from plastic pollution. Our commitment is to create a sustainable future where every piece of plastic waste is a valuable resource and never
            ends up in landfills or oceans.
          </p>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mb-6 max-w-md text-4xl">Creating a sustainable Circular Economy</h2>
            <p className="mb-5 leading-[1.9]">
              With a strong emphasis on environmental responsibility, we actively collaborates with local communities and businesses to establish efficient
              collection and recycling systems.
            </p>
            <p className="mb-8 leading-[1.9]">
              We offer tailored recycling solutions to industries generating plastic waste, helping them divert plastic from landfills and reduce their
              environmental footprint.
            </p>
            <Button href="/about-us" variant="outline">
              Learn More
            </Button>
          </div>
          <div className="grid gap-4">
            <Image src="/images/mission-1.jpeg" alt="Collected plastic bottles at a Bluewater Eco site" width={1200} height={500} className="h-60 w-full object-cover" />
            <Image src="/images/mission-2.jpg" alt="Baled plastic waste ready for processing" width={1200} height={800} className="h-80 w-full object-cover" />
          </div>
        </Container>
      </section>

      <GoalsImpact />

      {/* Products */}
      <section className="py-24 text-center">
        <Container>
          <h2 className="mb-12 text-4xl">Our Products</h2>
          <Button href="/our-services" variant="outline">
            View All our Products &amp; Services
          </Button>
        </Container>
      </section>

      <Newsletter />
    </>
  );
}
