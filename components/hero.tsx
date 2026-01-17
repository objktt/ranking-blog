"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-6 pb-12 border-b border-black/10">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-product.png" 
          alt="Product of the Week" 
          fill
          className="object-cover object-center opacity-90 grayscale md:grayscale-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
           >
             <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
               Weekly Highlight
             </span>
             <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
               Photography / Gear
             </span>
           </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-heading leading-tight"
            >
              The Leica M11 <br /> 
              <span className="text-neutral-500">Monochrom.</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <p className="text-lg md:text-xl font-medium leading-relaxed max-w-xl text-neutral-800">
              Is black and white photography still relevant in 2024? 
              We reviewed the ultimate tool for purists to find out if less really is more.
            </p>
            <Link 
              href="/blog/leica-m11-review"
              className="group flex items-center gap-4 border-b border-black pb-1 hover:opacity-60 transition-opacity"
            >
              <span className="text-sm font-bold uppercase tracking-widest">Read Review</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
