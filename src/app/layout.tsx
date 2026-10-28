import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Home - ${site.legalName}`, template: `%s - ${site.legalName}` },
  description: site.description,
  openGraph: { siteName: site.legalName, type: 'website', locale: 'en_GB', images: ['/images/hero.jpg'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
