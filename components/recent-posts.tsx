import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const posts = [
  {
    title: "Best Noise Cancelling Headphones 2024",
    category: "Audio",
    date: new Date("2024-01-15"),
    excerpt: "We tested the top 50 models. Only 3 survived our noise chamber test.",
    slug: "best-nc-headphones-2024",
    image: "/post-headphones.png"
  },
  {
    title: "Top Rated Air Purifiers for Allergies",
    category: "Lifestyle",
    date: new Date("2024-01-12"),
    excerpt: "HEPA filters, CADR ratings, and noise levels compared.",
    slug: "best-air-purifiers",
    image: "/post-airpurifier.png"
  },
  {
    title: "Smart Scales That Actually Work",
    category: "Health",
    date: new Date("2024-01-10"),
    excerpt: "Accuracy tests against medical grade equipment.",
    slug: "smart-scales-review",
    image: "/post-scale.png"
  }
];

export default function RecentPosts() {
  return (
    <div className="grid gap-px bg-black h-px-10 border border-black/10">
      {posts.map((post) => (
        <Link 
          key={post.slug} 
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-1 md:grid-cols-4 bg-background hover:bg-neutral-50 transition-colors"
        >
          <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border-r border-black/5">
             <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
             />
          </div>
          <div className="col-span-1 md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                {post.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {formatDistanceToNow(post.date, { addSuffix: true })}
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
