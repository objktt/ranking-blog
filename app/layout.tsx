import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shaking Baking Ranking",
  description: "The most honest product rankings on the internet. No fluff, just facts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white"
      >
        <header className="fixed top-0 z-50 w-full mix-blend-difference text-white">
          <nav className="container mx-auto flex h-20 items-center justify-between px-6">
            <Link href="/" className="font-heading font-black text-lg tracking-tighter uppercase leading-[0.75] flex flex-col hover:opacity-70 transition-opacity">
              <span>Shaking</span>
              <span>Baking</span>
              <span>Ranking</span>
            </Link>
            <ul className="flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
              <li><Link href="/audio" className="hover:underline underline-offset-4">Audio</Link></li>
              <li><Link href="/lifestyle" className="hover:underline underline-offset-4">Lifestyle</Link></li>
              <li><Link href="/health" className="hover:underline underline-offset-4">Health</Link></li>
            </ul>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-neutral-200 py-12 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <h4 className="font-heading text-xl font-bold uppercase tracking-tight">Ranking Blog</h4>
              <p className="text-sm text-neutral-500 max-w-xs">
                Honest, data-driven rankings for the products that matter.
                No fluff. Just facts.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-neutral-600">
             <Link href="/about" className="hover:text-black">About</Link>
             <Link href="/privacy" className="hover:text-black">Privacy</Link>
             <Link href="/contact" className="hover:text-black">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
