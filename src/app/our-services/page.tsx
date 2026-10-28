import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import PageHero from '@/components/PageHero';
import { Products, ServicesGrid } from '@/components/Sections';

export const metadata: Metadata = { title: 'Our Services' };

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" />
      <ServicesGrid />
      <Products />
      <Newsletter />
    </>
  );
}
