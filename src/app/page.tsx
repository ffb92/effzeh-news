import { getAllPosts } from '@/lib/posts';
import NewsCard from '@/components/NewsCard';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-12 text-center py-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fc-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fc-red"></span>
          </span>
          <span className="text-sm text-fc-gray uppercase tracking-widest">
            Alle 4 Stunden aktualisiert
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          <span className="gradient-text">1. FC Köln</span>
          <br />
          <span className="text-white">News & Analysen</span>
        </h1>
        <p className="text-fc-gray max-w-2xl mx-auto text-lg">
          Automatisch kuratierte Nachrichten aus 9 Quellen –
          von FC.de über Geißblog bis Kicker. Immer aktuell, immer informiert.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['FC.de', 'Geißblog', 'Come-On-FC', 'Geißbockecho', 'Effzeh.com',
            'Transfermarkt', 'Express', 'KSTA', 'Kicker'].map((src) => (
            <span key={src} className="badge-source text-[11px] py-1 px-3">
              {src}
            </span>
          ))}
        </div>
      </section>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div key={post.slug} style={{ animationDelay: `${i * 80}ms` }}>
              <NewsCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐐</div>
          <h2 className="text-2xl font-bold text-white mb-2">Noch keine Artikel</h2>
          <p className="text-fc-gray max-w-md mx-auto">
            Der automatisierte News-Aggregator scannt alle 4 Stunden die Quellen.
            Die ersten Artikel erscheinen in Kürze!
          </p>
        </div>
      )}
    </div>
  );
}
