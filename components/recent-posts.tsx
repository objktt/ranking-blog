import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  publishedAt: Date | null;
  categoryId: number | null;
}

const fallbackPosts = [
  {
    id: 0,
    title: "Best Noise Cancelling Headphones 2024",
    slug: "best-nc-headphones-2024",
    excerpt: "We tested the top 50 models. Only 3 survived our noise chamber test.",
    image: "/post-headphones.png",
    publishedAt: new Date("2024-01-15"),
    categoryId: 1,
  },
  {
    id: 1,
    title: "Top Rated Air Purifiers for Allergies",
    slug: "best-air-purifiers",
    excerpt: "HEPA filters, CADR ratings, and noise levels compared.",
    image: "/post-airpurifier.png",
    publishedAt: new Date("2024-01-12"),
    categoryId: 2,
  },
  {
    id: 2,
    title: "Smart Scales That Actually Work",
    slug: "smart-scales-review",
    excerpt: "Accuracy tests against medical grade equipment.",
    image: "/post-scale.png",
    publishedAt: new Date("2024-01-10"),
    categoryId: 3,
  },
];

interface RecentPostsProps {
  posts?: Post[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  const displayPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  if (displayPosts.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No posts yet. Check back soon!
      </div>
    );
  }

  return (
    <div className="grid gap-px bg-black h-px-10 border border-black/10">
      {displayPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-1 md:grid-cols-4 bg-background hover:bg-neutral-50 transition-colors"
        >
          <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border-r border-black/5">
            <Image
              src={post.image || "/placeholder.png"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="col-span-1 md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                {post.categoryId === 1
                  ? "Audio"
                  : post.categoryId === 2
                  ? "Lifestyle"
                  : "Health"}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {post.publishedAt
                  ? formatDistanceToNow(new Date(post.publishedAt), {
                      addSuffix: true,
                    })
                  : "Recently"}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:underline underline-offset-4 decoration-2">
              {post.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
