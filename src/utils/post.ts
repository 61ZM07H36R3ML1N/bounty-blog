import type { SeverityLevel } from '../types/post';

export interface PostFrontmatter {
  title: string;
  target: string;
  severity: SeverityLevel;
  cvss: number;
  date: string;
  summary?: string;
}

export interface PostItem extends PostFrontmatter {
  slug: string;
}

interface MDXModule {
  frontmatter: PostFrontmatter;
  default: React.ComponentType;
}

export function getAllPosts(): PostItem[] {
  // Eagerly load all MDX files inside content/posts
  const modules = import.meta.glob<MDXModule>('../../content/posts/*.mdx', { eager: true });

  const posts: PostItem[] = Object.entries(modules).map(([filepath, mod]) => {
    // Derive slug from filename: "../../content/posts/2026-10-idor.mdx" -> "2026-10-idor"
    const filename = filepath.split('/').pop() || '';
    const slug = filename.replace(/\.mdx$/, '');

    return {
      slug,
      ...mod.frontmatter,
    };
  });

  // Sort descending by date (most recent first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}