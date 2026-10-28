import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the old WordPress URLs working
  async redirects() {
    return [
      { source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
