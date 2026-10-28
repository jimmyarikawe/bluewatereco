import Link from 'next/link';
import { nav, site } from '@/lib/site';

export default function Footer() {
  const companyLinks = nav.filter((n) => n.href !== '/blog');

  return (
    <footer className="bg-primary text-sm text-white/75">
      <div className="mx-auto grid max-w-325 gap-10 px-5 py-16 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
        <div>
          <h4 className="mb-5 text-sm text-white">About Bluewater Eco</h4>
          <p className="max-w-xl leading-[2.1]">{site.description}</p>
        </div>
        <div>
          <h4 className="mb-5 text-sm text-white">Contact Us</h4>
          <address className="space-y-1 leading-[2.1] not-italic">
            <p>{site.address}</p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </p>
            <p>
              {site.phones.map((phone, i) => (
                <span key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">
                    {phone}
                  </a>
                  {i < site.phones.length - 1 && ', '}
                </span>
              ))}
            </p>
          </address>
        </div>
        <div>
          <h4 className="mb-5 text-sm text-white">Company</h4>
          <ul className="space-y-3">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-dark">
        <div className="mx-auto max-w-325 border-t border-white/10 px-5 py-8">
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
