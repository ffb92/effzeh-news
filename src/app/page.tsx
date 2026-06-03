import { getAllPosts } from '@/lib/posts';
import NewsCard from '@/components/NewsCard';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-12 text-center py-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-sm text-fc-gray uppercase tracking-widest">
            Unabhängige FC-Berichterstattung
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          <span className="gradient-text">1. FC Köln</span>
          <br />
          <span className="text-white">News & Analysen</span>
        </h1>
        <p className="text-fc-gray max-w-2xl mx-auto text-lg">
          Aktuelle Nachrichten, Spielberichte und Hintergründe rund um den 1. FC Köln –
          kuratiert aus den wichtigsten Quellen der FC-Medienlandschaft.
        </p>
      </section>

      <div className="flex items-center gap-6 mb-8 py-3 px-5 bg-fc-dark-soft rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-fc-red font-bold text-lg">{posts.length}</span>
          <span className="text-fc-gray text-sm">Artikel</span>
        </div>
        <div className="w-px h-4 bg-white/10"></div>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">FC-News</span>
          <span className="text-fc-gray text-sm">· Redaktion</span>
        </div>
      </div>

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
          <h2 className="text-2xl font-bold text-white mb-2">Bald geht's los!</h2>
          <p className="text-fc-gray max-w-md mx-auto">
            Unsere Redaktion bereitet die ersten Artikel vor.
            Schau bald wieder vorbei!
          </p>
        </div>
      )}
    </div>
  );
}
