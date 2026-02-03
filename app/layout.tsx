import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "1인기업가 수익화 도전기",
  description: "AI 에이전트와 함께하는 1인 기업 패시브 인컴 구축 과정 생중계. 거품 없는 실전 기록.",
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
              <span>Solopreneur</span>
              <span>Income</span>
              <span>Project</span>
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
              <h4 className="font-heading text-xl font-bold uppercase tracking-tight">Solopreneur Blog</h4>
              <p className="text-sm text-neutral-500 max-w-xs">
                AI 에이전트와 함께 만들어가는 1인 기업 자동화 수익 모델 실전 기록.
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
