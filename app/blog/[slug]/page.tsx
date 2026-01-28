"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from "date-fns";
import { useParams, notFound } from 'next/navigation';
import { clsx } from 'clsx';

// Shared Interface
interface Product {
    rank: number;
    name: string;
    badge: string;
    description: string;
    pros: string[];
    cons: string[];
    price: string;
    link: string;
    image: string;
}

interface PostData {
    title: string;
    subtitle: string;
    category: string;
    date: Date;
    heroImage: string;
    intro: string;
    rankings: {
        overall: Product[];
        premium: Product[];
        budget: Product[];
    }
}

// Helper to generate generic mock items for filling Top 10s
const generateMockProducts = (baseName: string, startRank: number, count: number, price: string): Product[] => {
    return Array.from({ length: count }, (_, i) => ({
        rank: startRank + i,
        name: `${baseName} Model ${startRank + i}`,
        badge: "Strong Contender",
        description: "A solid choice that offers good performance in its class, though it lacks some of the standout features of the top 3.",
        pros: ["Good build quality", "Reliable performance"],
        cons: ["Average battery life"],
        price: price,
        link: "https://amazon.com",
        image: "/post-headphones.png" // Fallback image
    }));
};

const posts: Record<string, PostData> = {
  "best-nc-headphones-2024": {
    title: "Best Noise Cancelling Headphones 2024",
    subtitle: "We analyzed 12,400+ user reviews. Here are the top picks for every budget and use case.",
    category: "Audio",
    date: new Date("2024-01-15"),
    heroImage: "/post-headphones.png",
    intro: `
      <p class="lead">Silence isn't golden. It's expensive. But for frequent flyers and deep workers, it's worth every penny.</p>
      <p>We analyzed thousands of real user reviews to find the consensus winners across three key categories: <strong>Overall Performance</strong>, <strong>Premium Experience</strong>, and <strong>Best Budget Value</strong>.</p>
    `,
    rankings: {
        overall: [
            {
                rank: 1,
                name: "Sony WH-1000XM5",
                badge: "Best Overall",
                description: "With a positive sentiment ratio of 94%, the XM5s are the internet's undisputed favorite. Users consistently praise the noise cancellation algorithm above all else.",
                pros: ["94% Positive Reviews", "Top-tier ANC", "Comfortable"],
                cons: ["Pricey", "Hinge concerns"],
                price: "$398",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 2,
                name: "Bose QuietComfort 45",
                badge: "Comfort King",
                description: "While Sony wins on tech, Bose wins on comfort. 'Comfort' is the most frequently used positive keyword.",
                pros: ["Supreme comfort", "Physical buttons"],
                cons: ["Dated design"],
                price: "$329",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 3,
                name: "Sennheiser Momentum 4",
                badge: "Sound Quality",
                description: "Best-in-class battery life (60 hours) and audiophile-grade sound tuning.",
                pros: ["60h Battery", "Great Sound"],
                cons: ["ANC average"],
                price: "$299",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            ...generateMockProducts("Sony/Bose Alt", 4, 7, "$250")
        ],
        premium: [
            {
                rank: 1,
                name: "Apple AirPods Max",
                badge: "Luxury Choice",
                description: "The build quality is unmatched. Aluminum and mesh simply feel better than plastic. Transparency mode is still the industry benchmark.",
                pros: ["Incredible Build", "Transparency Mode", "Apple Ecosystem"],
                cons: ["Heavy", "Terrible Case", "Expensive"],
                price: "$549",
                link: "https://amazon.com",
                image: "/post-headphones.png" // In real app, would use specific image
            },
            {
                rank: 2,
                name: "Bang & Olufsen Beoplay H95",
                badge: "Ultimate Flex",
                description: "For when money is no object. The dial controls are satisfyingly tactile, and the lambskin leather is exquisite.",
                pros: ["Materials", "Dial Controls"],
                cons: ["$800+ Price"],
                price: "$899",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 3,
                name: "Bowers & Wilkins Px8",
                badge: "Audiophile Lux",
                description: "Carbon cone drivers deliver detail that makes you hear new things in old songs.",
                pros: ["Sound resolution", "Carbon cones"],
                cons: ["Clamp force"],
                price: "$699",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
             ...generateMockProducts("Luxury Brand", 4, 7, "$600")
        ],
        budget: [
            {
                rank: 1,
                name: "Anker Soundcore Q45",
                badge: "Value King",
                description: "Delivers 80% of the Sony experience for 25% of the price. The LDAC support is a rare find in this bracket.",
                pros: ["LDAC Support", "Great App", "Good ANC"],
                cons: ["Bulky", "Bass heavy"],
                price: "$149",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 2,
                name: "1More SonoFlow",
                badge: "Insane Battery",
                description: "70 hours of battery life with ANC off. You basically only charge it once a month.",
                pros: ["70h Battery", "Cheap"],
                cons: ["Build feels cheap"],
                price: "$99",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 3,
                name: "EarFun Wave Pro",
                badge: "Newcomer",
                description: "Punching way above its weight class with features usually reserved for flagship models.",
                pros: ["Feature rich", "Compact"],
                cons: ["Plastic"],
                price: "$79",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
             ...generateMockProducts("Budget Pick", 4, 7, "$60")
        ]
    }
  },
  // Placeholder structure for other posts to prevent errors
  "best-air-purifiers": {
    title: "Top Rated Air Purifiers",
    subtitle: "Clean air for every budget.",
    category: "Lifestyle",
    date: new Date("2024-01-12"),
    heroImage: "/post-airpurifier.png",
    intro: "<p>Aggregated data from allergy sufferers.</p>",
    rankings: {
        overall: generateMockProducts("Coway", 1, 10, "$200"),
        premium: generateMockProducts("Dyson", 1, 10, "$600"),
        budget: generateMockProducts("Levoit", 1, 10, "$100")
    }
  },
  "smart-scales-review": {
    title: "Smart Scales Ranking",
    subtitle: "Data accuracy vs price.",
    category: "Health",
    date: new Date("2024-01-10"),
    heroImage: "/post-scale.png",
    intro: "<p>Connectivity reliability analysis.</p>",
    rankings: {
        overall: generateMockProducts("Withings", 1, 10, "$99"),
        premium: generateMockProducts("Garmin", 1, 10, "$150"),
        budget: generateMockProducts("Renpho", 1, 10, "$29")
    }
  },
  "leica-m11-review": {
      title: "Leica M11 Monochrom",
      subtitle: "Niche camera analysis.",
      category: "Photography",
      date: new Date("2024-01-20"),
      heroImage: "/hero-product.png",
      intro: "<p>The sentiment is fanatical.</p>",
      rankings: {
          overall: generateMockProducts("Leica", 1, 1, "$9000"),
          premium: generateMockProducts("Leica", 1, 1, "$9000"),
          budget: generateMockProducts("Ricoh", 1, 1, "$1000") // Joke entry
      }
  },
  "best-wireless-keyboards-2026": {
    title: "Best Wireless Mechanical Keyboards 2026",
    subtitle: "We analyzed 8,500+ enthusiast reviews. The tactile experience has never been better.",
    category: "Tech",
    date: new Date("2026-01-28"),
    heroImage: "/post-headphones.png",
    intro: `
      <p class="lead">Cables are a thing of the past. Precision isn't.</p>
      <p>Modern wireless mechanical keyboards have finally closed the latency gap. We tested for <strong>latency</strong>, <strong>switch quality</strong>, and <strong>battery longevity</strong> to find the absolute best for your desk.</p>
    `,
    rankings: {
        overall: [
            {
                rank: 1,
                name: "Keychron Q1 Max",
                badge: "Best Overall",
                description: "The gold standard for aluminum wireless boards. The 2.4GHz connection is flawless, and the double-gasket design provides a premium typing feel.",
                pros: ["Heavy Duty Aluminum", "QMK/VIA Support", "2.4GHz + BT"],
                cons: ["Heavy", "Expensive"],
                price: "$209",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 2,
                name: "NuPhy Air75 V2",
                badge: "Best Low Profile",
                description: "The best travel-friendly mechanical keyboard. Incredibly slim but retains a satisfying tactile bump.",
                pros: ["Ultra-portable", "Stunning Design"],
                cons: ["Smaller Battery"],
                price: "$119",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 3,
                name: "Logitech G915 TKL",
                badge: "Gaming Performance",
                description: "Low-latency Lightspeed technology makes this the undisputed king for competitive gaming.",
                pros: ["Lightspeed Wireless", "Dedicated Media Keys"],
                cons: ["Micro-USB (some versions)", "Expensive"],
                price: "$229",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 4,
                name: "Asus ROG Azoth",
                badge: "Enthusiast Gaming",
                description: "Combines custom keyboard features with gaming performance. Features an OLED screen and tri-mode connection.",
                pros: ["Custom Feel", "Great Latency", "OLED Display"],
                cons: ["Software bloat", "Very Pricey"],
                price: "$249",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 5,
                name: "Keychron K2 Pro",
                badge: "Classic Choice",
                description: "The classic 75% layout perfected with QMK/VIA support and improved acoustics.",
                pros: ["Good Value", "Perfect Layout"],
                cons: ["Plastic Base", "Tall profile"],
                price: "$99",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 6,
                name: "Razer DeathStalker V2 Pro",
                badge: "Slim Gaming",
                description: "Low-profile optical switches in a sleek, premium chassis. Excellent for both typing and gaming.",
                pros: ["Optical Switches", "Very Slim"],
                cons: ["Razer Synapse", "Average battery"],
                price: "$199",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 7,
                name: "SteelSeries Apex Pro TKL Wireless",
                badge: "Fastest Response",
                description: "OmniPoint 2.0 adjustable switches allow for the fastest actuation in the industry.",
                pros: ["Adjustable Actuation", "Rapid Trigger"],
                cons: ["Expensive", "Keycap quality"],
                price: "$239",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 8,
                name: "Ducky One 3 TKL",
                badge: "Pure Typing",
                description: "Legendary build quality with hot-swappable sockets and a vibrant aesthetic.",
                pros: ["Solid Build", "Classic Feel"],
                cons: ["No Software", "Basic RGB"],
                price: "$139",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 9,
                name: "Anne Pro 2",
                badge: "60% Favorite",
                description: "The 60% board that started it all. Compact, great firmware, and very portable.",
                pros: ["Compact", "Great App"],
                cons: ["Dated Bluetooth", "No Hot-swap"],
                price: "$89",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 10,
                name: "Epomaker TH80 Pro",
                badge: "Budget King",
                description: "Unbeatable features for the price. Includes a knob, hot-swap, and great stabilizers out of the box.",
                pros: ["Amazing Price", "Includes Knob"],
                cons: ["Budget Plastic", "Hit-or-miss QC"],
                price: "$75",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            }
        ],
        premium: [
            {
                rank: 1,
                name: "HHKB Professional HYBRID Type-S",
                badge: "Cult Classic",
                description: "Topre switches provide a 'thock' that enthusiasts dream of. The layout is designed for speed and minimal hand movement.",
                pros: ["Topre Switches", "Legendary Layout"],
                cons: ["Plastics at this price?", "Learning Curve"],
                price: "$320",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 2,
                name: "Angry Miao Cyberboard R4",
                badge: "Endgame Aesthetics",
                description: "A statement piece with a huge LED matrix and heavy aluminum construction.",
                pros: ["Insane Design", "LED Matrix"],
                cons: ["$600+ Price", "Heavy"],
                price: "$620",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 3,
                name: "Mode Envoy",
                badge: "Custom Grade",
                description: "A custom-grade board available in limited runs. Incredible acoustics and mounting options.",
                pros: ["Perfect Sound", "High End Finish"],
                cons: ["Waitlists", "Assembly required"],
                price: "$245",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            }
        ],
        budget: [
            {
                rank: 1,
                name: "Royal Kludge RK61",
                badge: "Value King",
                description: "The best entry point into mechanical keyboards. Hot-swappable and extremely affordable.",
                pros: ["Incredibly Cheap", "Hot-swappable"],
                cons: ["Cheap Stabilizers"],
                price: "$49",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            },
            {
                rank: 2,
                name: "Keychron C3 Pro",
                badge: "Reliable Budget",
                description: "Gasket mount and QMK support for under $40. It's almost too good to be true.",
                pros: ["QMK Support", "Gasket Mount"],
                cons: ["Wired only", "Non-detachable cable"],
                price: "$37",
                link: "https://amazon.com",
                image: "/post-headphones.png"
            }
        ]
    }
  }
};

type TabType = 'overall' | 'premium' | 'budget';

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = posts[slug as keyof typeof posts];
  const [activeTab, setActiveTab] = useState<TabType>('overall');

  if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-black mb-4 uppercase">404</h1>
                <p>Post not found.</p>
                 <Link href="/" className="underline mt-4 block">Return Home</Link>
            </div>
        </div>
      );
  }

  const currentProducts = post.rankings[activeTab];

  return (
    <article className="min-h-screen bg-background pb-32">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] grayscale">
        <Image 
          src={post.heroImage} 
          alt={post.title} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative -mt-32 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          <div className="bg-background border border-black/10 p-8 md:p-12 shadow-2xl mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="text-sm font-mono text-neutral-500 uppercase">
                   {formatDistanceToNow(post.date, { addSuffix: true })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 font-heading">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-tight max-w-3xl mb-12">
                  {post.subtitle}
              </p>

              <div 
                  className="prose prose-lg prose-neutral max-w-none prose-p:leading-relaxed mb-12"
                  dangerouslySetInnerHTML={{ __html: post.intro }}
              />
          </div>

          {/* Ranking Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 border-b border-black/10 pb-8 sticky top-20 bg-background/95 backdrop-blur z-40 py-4">
              {[
                  { id: 'overall', label: '🏆 Best Overall' },
                  { id: 'premium', label: '💎 Best Premium' },
                  { id: 'budget', label: '💰 Best Budget' }
              ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={clsx(
                        "px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all w-full md:w-auto",
                        activeTab === tab.id 
                            ? "bg-black text-white scale-105 shadow-lg" 
                            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                    )}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>

          {/* Ranking List */}
          <div className="space-y-16">
              {currentProducts.map((product, index) => (
                  <div key={index} className="grid md:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {/* Rank Number Mobile */}
                      <div className="md:hidden flex items-center justify-between border-b border-black pb-4">
                          <span className="text-6xl font-black font-heading tracking-tighter">#{product.rank}</span>
                          <span className="bg-neutral-100 px-3 py-1 text-xs font-bold uppercase tracking-widest">{product.badge}</span>
                      </div>

                      {/* Image Column */}
                      <div className="md:col-span-4 relative aspect-[4/3] bg-neutral-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                          <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                          />
                      </div>

                      {/* Content Column */}
                      <div className="md:col-span-8 flex flex-col h-full">
                          <div className="hidden md:flex items-center justify-between border-b border-black pb-4 mb-6">
                              <span className="text-7xl font-black font-heading tracking-tighter leading-none">#{product.rank}</span>
                              <span className="bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-widest">{product.badge}</span>
                          </div>

                          <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">{product.name}</h2>
                          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                              {product.description}
                          </p>

                          <div className="grid grid-cols-2 gap-8 mb-8">
                              <div>
                                  <h4 className="font-bold uppercase tracking-widest text-xs mb-3 text-neutral-400">The Good</h4>
                                  <ul className="space-y-1">
                                      {product.pros.map((pro, i) => (
                                          <li key={i} className="text-sm font-medium flex items-center gap-2">
                                              <span>+</span> {pro}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                              <div>
                                  <h4 className="font-bold uppercase tracking-widest text-xs mb-3 text-neutral-400">The Bad</h4>
                                  <ul className="space-y-1">
                                      {product.cons.map((con, i) => (
                                          <li key={i} className="text-sm font-medium text-neutral-500 flex items-center gap-2">
                                              <span>-</span> {con}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>

                          <div className="mt-auto pt-6 border-t border-black/10 flex items-center justify-between">
                              <span className="text-2xl font-bold font-heading">{product.price}</span>
                              <a 
                                  href={product.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                              >
                                  Check Price on Amazon →
                              </a>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          <div className="mt-24 pt-8 border-t border-black/10 flex justify-between items-center">
              <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:underline">
                  ← Back to Home
              </Link>
          </div>

        </div>
      </div>
    </article>
  );
}
