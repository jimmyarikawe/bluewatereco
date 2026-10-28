# Bluewater Eco website

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 rebuild of the WordPress/Elementor site at bluewatereco.com.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `src/app/` – pages: `/`, `/about-us`, `/our-services`, `/blog`, `/blog/[slug]`, `/contact-us`, plus `sitemap.xml` and `robots.txt`
- `src/app/api/contact`, `src/app/api/newsletter` – form handlers (configure via `.env.local`, see `.env.example`)
- `src/lib/site.ts` – contact details, nav, services, products, goals (edit copy here)
- `src/content/posts.json` – blog posts (migrated from WordPress)
- `public/images/` – images
- `static-mirror/` (git-ignored, local only) – static copy of the old WordPress site, kept for reference

Old WordPress post URLs (`/2020/08/31/<old-slug>/`) and `/category/*`, `/author/*` redirect to the new blog routes.
