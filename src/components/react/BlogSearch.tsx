import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';

interface SearchPost {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface BlogSearchProps {
  posts: SearchPost[];
}

export default function BlogSearch({ posts }: Readonly<BlogSearchProps>) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [posts, q]);

  useEffect(() => {
    const staticList = document.getElementById('blog-static');
    if (staticList) staticList.hidden = q.length > 0;
  }, [q]);

  return (
    <div>
      <div className="relative mb-6">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <input
          type="search"
          aria-label="Search posts"
          placeholder="grep -i 'search posts...'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-bg-terminal border-border text-text placeholder:text-text-muted focus:border-border-hover h-11 w-full rounded-md border pr-4 pl-10 font-mono text-[0.8125rem] transition-all duration-150 focus:shadow-(--shadow-accent-focus) focus:outline-none"
        />
      </div>

      {q.length > 0 && (
        <div className="mb-8">
          <p aria-live="polite" className="text-text-muted mb-3 font-mono text-xs">
            {results.length} match{results.length === 1 ? '' : 'es'} for &ldquo;{query.trim()}
            &rdquo;
          </p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 font-mono text-[0.8125rem]">
            {results.map((post) => (
              <li key={post.id}>
                <a
                  href={`/blog/${post.id}`}
                  className="text-text-secondary hover:text-text block leading-relaxed transition-colors"
                >
                  <span style={{ color: 'var(--color-accent)' }}>blog/{post.id}.mdx</span>
                  <span className="text-text-muted">:</span> {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
