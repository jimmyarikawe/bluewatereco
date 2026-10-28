import posts from '@/content/posts.json';

export type Post = {
  slug: string;
  legacySlug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  html: string;
};

export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
