import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Container } from '@/components/ui';
import { formatDate, getPost, getPosts } from '@/lib/posts';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', publishedTime: post.date, images: [post.image] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    // Old WordPress slugs (/2020/08/31/<legacy>/ is redirected here by next.config.ts)
    const legacy = getPosts().find((p) => p.legacySlug === slug);
    if (legacy) permanentRedirect(`/blog/${legacy.slug}`);
    notFound();
  }
  const others = getPosts().filter((p) => p.slug !== post.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-dark pt-40 pb-20 lg:pt-48 lg:pb-28">
        <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-[#040d22e6] to-[#0910234d]" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/75">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>›</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
          </nav>
          <h1 className="max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mt-6 text-sm text-white/75">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </Container>
      </section>

      <article className="py-20">
        <Container className="max-w-3xl">
          <div className="prose-post" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Container>
      </article>

      {others.length > 0 && (
        <section className="border-t border-gray-100 py-20">
          <Container>
            <h2 className="mb-10 text-2xl">You may also like</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <PostCard key={p.slug} post={p} showExcerpt />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
