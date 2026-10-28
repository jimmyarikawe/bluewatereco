import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import { nav, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...nav.map((n) => ({ url: `${site.url}${n.href === '/' ? '' : n.href}` })),
    ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
