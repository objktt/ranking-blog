import Hero from "@/components/hero";
import RecentPosts from "@/components/recent-posts";
import Link from "next/link";
import Image from "next/image";
import { db, categories, subcategories, posts } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

// Force dynamic rendering to avoid build-time DB queries
export const dynamic = "force-dynamic";

async function getCategories() {
  const cats = await db.select().from(categories);
  const subcats = await db.select().from(subcategories);

  return cats.map((cat) => ({
    ...cat,
    href: `/${cat.slug}`,
    items: subcats
      .filter((sub) => sub.categoryId === cat.id)
      .map((sub) => sub.name),
  }));
}

async function getRecentPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))
    .limit(3);
}

export default async function Home() {
  const categoriesData = await getCategories();
  const recentPosts = await getRecentPosts();

  return (
    <div className="space-y-0">
      <Hero />

      <section id="categories" className="border-b border-black/10 py-24 px-6">
        <div className="container mx-auto">
          <div className="flex items-baseline justify-between mb-16">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter font-heading">
              Categories
            </h2>
            <Link
              href="/blog"
              className="hidden md:block text-sm uppercase tracking-widest hover:underline underline-offset-4"
            >
              View All Journals
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            {categoriesData.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group relative bg-background h-full transition-colors hover:bg-neutral-50 flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={cat.image || "/placeholder.png"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between flex-1 gap-12">
                  <div>
                    <h3 className="text-3xl font-bold uppercase tracking-tight mb-2 font-heading group-hover:underline underline-offset-4 decoration-2">
                      {cat.name}
                    </h3>
                    <p className="text-neutral-500 font-medium">
                      {cat.description}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm border-b border-black/5 py-2 flex justify-between"
                      >
                        <span>{item}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-24 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter font-heading mb-8">
              Project Goal
            </h2>
            <p className="text-xl leading-relaxed text-neutral-600 max-w-md">
              우리는 단순히 정보를 나열하지 않습니다. AI 에이전트 huhu와 함께 실제 1인 기업 수익 모델을 구축하고, 그 모든 과정을 투명하게 기록합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {[
              {
                title: "AI Collaboration",
                desc: "AI 에이전트를 활용한 업무 자동화 및 수익화 시스템 구축.",
              },
              {
                title: "Monetization",
                desc: "1인 기업으로서의 자립을 위한 수익원 확보.",
              },
              {
                title: "Build in Public",
                desc: "0원부터 목표 금액까지의 모든 실전 데이터와 일지 공개.",
              },
            ].map((item, i) => (
              <div key={item.title} className="border-t border-black py-6">
                <span className="text-xs font-mono mb-2 block">0{i + 1}</span>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="recent-posts"
        className="border-t border-black/10 py-24 px-6 bg-neutral-50"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter font-heading mb-16">
            Late<span className="text-neutral-400">st</span>
          </h2>
          <RecentPosts posts={recentPosts} />
        </div>
      </section>
    </div>
  );
}
