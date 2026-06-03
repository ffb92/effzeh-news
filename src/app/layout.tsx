import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Effzeh News – 1. FC Köln Nachrichten',
  description: 'Automatisierte Nachrichten rund um den 1. FC Köln',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-fc-dark/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-fc-red flex items-center justify-center
                            text-white font-black text-lg group-hover:scale-110 transition-transform">
                FC
              </div>
              <div>
                <div className="font-black text-lg tracking-tight leading-tight">
                  Effzeh <span className="text-fc-red">News</span>
                </div>
                <div className="text-[10px] text-fc-gray uppercase tracking-widest">
                  1. FC Köln
                </div>
              </div>
            </a>
            <div className="flex items-center gap-2 text-xs text-fc-gray">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fc-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fc-red"></span>
              </span>
              Auto-Updates aktiv
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/5 bg-fc-dark-soft">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fc-gray">
              <div className="flex items-center gap-2">
                <span className="text-fc-red font-bold">Effzeh News</span>
                <span>·</span>
                <span>Automatisiert mit ❤️ für den 1. FC Köln</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
