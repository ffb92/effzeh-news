import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-fc-gray hover:text-white transition-colors mb-6 text-sm">
        ← Zurück zur Übersicht
      </Link>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge">{post.category}</span>
          <span className="badge-source">{post.source}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-fc-gray">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('de-DE', {
              weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })} Uhr
          </time>
          {post.sourceUrl !== '#' && (
            <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer"
               className="text-fc-red hover:text-fc-red-light transition-colors">
              Original-Quelle ↗
            </a>
          )}
        </div>
      </header>
      {post.image ? (
        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-fc-dark-soft">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 relative">
          <img src="/images/card-default.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-fc-dark/80 via-transparent to-transparent" />
        </div>
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
          {post.tags.map((tag) => (
            <span key={tag} className="badge-source text-xs">#{tag}</span>
          ))}
        </div>
      )}
      <div className="mt-8 p-4 bg-fc-dark-soft rounded-xl border border-white/5 text-xs text-fc-gray leading-relaxed">
        <strong className="text-white/70">Quelle:</strong>{' '}
        <a href={post.sourceUrl} target="_blank" rel="noopener" className="text-fc-red">
          {post.source}
        </a>
        {post.sourceUrl !== '#' && (
          <> – dieser Artikel basiert auf einer Meldung der Originalquelle. Für den vollständigen Bericht besuche bitte die verlinkte Seite.</>
        )}
      </div>
    </article>
  );
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" className="rounded-xl my-4" />')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^---$/gm, '<hr className="my-8 border-white/10" />')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul className="list-disc pl-5 mb-4 space-y-1">$&</ul>');
  return html;
}
