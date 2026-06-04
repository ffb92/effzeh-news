import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

const categoryColors: Record<string, string> = {
  News: 'bg-fc-red/15 text-fc-red border-fc-red/20',
  Transfer: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Spielbericht: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  Analyse: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  Gerücht: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
};

export default function NewsCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="card group block animate-fade-in">
      <div className="aspect-[16/9] bg-gradient-to-br from-fc-red/20 to-fc-dark-soft overflow-hidden relative">
        {post.image ? (
          <img src={post.image} alt={post.title}
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <img src="/images/card-default.png" alt=""
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold border
            ${categoryColors[post.category] || 'bg-white/10 text-white/70 border-white/10'}`}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-fc-gray">
          <span className="badge-source">{post.source}</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('de-DE', {
              day: '2-digit', month: '2-digit', year: 'numeric',
            })}
          </time>
        </div>
        <h3 className="font-bold leading-snug text-white group-hover:text-fc-red transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-fc-gray leading-relaxed line-clamp-2">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-fc-gray/60 hover:text-fc-red transition-colors">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
