import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

interface BlogListProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 5;

export default function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // All unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  // Filtered posts
  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, activeTag, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset page when filters change
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };
  const handleTag = (tag: string | null) => {
    setActiveTag(tag === activeTag ? null : tag);
    setPage(1);
  };

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <input
          type="text"
          placeholder="grep -i 'search posts...'"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-bg-terminal border border-border rounded-md font-mono text-[0.8125rem] text-text pl-10 pr-4 h-11 transition-all duration-150 placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:shadow-[0_0_0_3px_rgba(177,151,252,0.08)]"
        />
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleTag(null)}
          className={`px-3 py-1 rounded-md font-mono text-xs transition-all duration-150 border ${
            activeTag === null
              ? 'border-border-hover text-text'
              : 'border-border text-text-muted hover:border-border-hover hover:text-text'
          }`}
          style={activeTag === null ? { background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)', borderColor: 'var(--color-border-hover)' } : {}}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTag(tag)}
            className={`px-3 py-1 rounded-md font-mono text-xs transition-all duration-150 border ${
              activeTag === tag
                ? 'border-border-hover'
                : 'border-border text-text-muted hover:border-border-hover hover:text-text'
            }`}
            style={activeTag === tag ? { background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)', borderColor: 'var(--color-border-hover)' } : {}}
          >
            {tag.toLowerCase()}
          </button>
        ))}
      </div>

      {/* Posts */}
      {paginated.length === 0 ? (
        <div className="bg-bg-terminal border border-border rounded-lg p-8 text-center">
          <p className="text-text-muted font-mono text-sm mb-1">
            No matches found.
          </p>
          <p className="text-text-muted font-mono text-xs">
            Try a different search or clear the filter.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paginated.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-bg-terminal border border-border rounded-lg p-5 transition-all duration-200 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(177,151,252,0.06)]"
            >
              <div className="flex items-center gap-2 text-[0.6875rem] text-text-muted font-mono mb-2.5">
                <span
                  className="px-1.5 py-0.5 rounded font-medium"
                  style={{
                    background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                    color: 'var(--color-accent)',
                  }}
                >
                  Read
                </span>
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
                <span>· {post.readingTime} min read</span>
              </div>
              <h2 className="text-lg font-semibold font-sans text-text group-hover:text-accent transition-colors mb-1.5" style={{ color: undefined }}>
                {post.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[0.6875rem]"
                    style={{
                      background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8 font-mono text-sm">
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-text-muted transition-all duration-150 hover:border-border-hover hover:text-text disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-muted"
          >
            <ChevronLeft size={14} /> prev
          </button>
          <span className="text-text-muted">
            <span className="text-text">{currentPage}</span> / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-text-muted transition-all duration-150 hover:border-border-hover hover:text-text disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-muted"
          >
            next <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Result count */}
      <p className="text-center text-text-muted font-mono text-xs mt-4">
        {filtered.length} post{filtered.length !== 1 ? 's' : ''}{activeTag ? ` tagged "${activeTag}"` : ''}{search ? ` matching "${search}"` : ''}
      </p>
    </div>
  );
}
