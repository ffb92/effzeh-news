import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  source: string;
  sourceUrl: string;
  excerpt: string;
  image?: string;
  category: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        source: data.source || 'Unbekannt',
        sourceUrl: data.sourceUrl || '#',
        excerpt: data.excerpt || '',
        image: data.image || null,
        category: data.category || 'News',
        tags: data.tags || [],
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    source: data.source || 'Unbekannt',
    sourceUrl: data.sourceUrl || '#',
    excerpt: data.excerpt || '',
    image: data.image || null,
    category: data.category || 'News',
    tags: data.tags || [],
    content,
  };
}
