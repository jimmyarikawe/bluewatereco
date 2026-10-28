import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import PageHero from '@/components/PageHero';
import PostCard from '@/components/PostCard';
import { Container } from '@/components/ui';
import { getPosts } from '@/lib/posts';

export const metadata: Metadata = { title: 'Blog' };

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" />
      <section className="py-24">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {getPosts().map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Container>
      </section>
      <Newsletter />
    </>
  );
}
