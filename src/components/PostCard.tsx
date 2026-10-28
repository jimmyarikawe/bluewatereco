import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type Post } from '@/lib/posts';

export default function PostCard({ post, showExcerpt = false }: { post: Post; showExcerpt?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_-15px_rgba(31,31,31,0.15)] transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[5/2] overflow-hidden">
        <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className={`p-6 ${showExcerpt ? '' : 'text-center'}`}>
        <h3 className="text-base leading-snug group-hover:text-primary">{post.title}</h3>
        {showExcerpt && (
          <>
            <p className="mt-3 text-sm leading-relaxed">{post.excerpt}</p>
            <p className="mt-4 text-xs font-bold tracking-wide text-body uppercase">{formatDate(post.date)}</p>
          </>
        )}
      </div>
    </Link>
  );
}
