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

export default function BlogList({ posts }: Readonly<BlogListProps>) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // All unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
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
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [posts, activeTag, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
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
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <input
          type="text"
          placeholder="grep -i 'search posts...'"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-bg-terminal border-border text-text placeholder:text-text-muted focus:border-border-hover h-11 w-full rounded-md border pr-4 pl-10 font-mono text-[0.8125rem] transition-all duration-150 focus:shadow-(--shadow-accent-focus) focus:outline-none"
        />
      </div>

      {/* Tag filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleTag(null)}
          className={`rounded-md border px-3 py-1 font-mono text-xs transition-all duration-150 ${
            activeTag === null
              ? 'border-border-hover text-text'
              : 'border-border text-text-muted hover:border-border-hover hover:text-text'
          }`}
          style={
            activeTag === null
              ? {
                  background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-border-hover)',
                }
              : {}
          }
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTag(tag)}
            className={`rounded-md border px-3 py-1 font-mono text-xs transition-all duration-150 ${
              activeTag === tag
                ? 'border-border-hover'
                : 'border-border text-text-muted hover:border-border-hover hover:text-text'
            }`}
            style={
              activeTag === tag
                ? {
                    background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                    color: 'var(--color-accent)',
                    borderColor: 'var(--color-border-hover)',
                  }
                : {}
            }
          >
            {tag.toLowerCase()}
          </button>
        ))}
      </div>

      {/* Posts */}
      {paginated.length === 0 ? (
        <div className="bg-bg-terminal border-border rounded-lg border p-8 text-center">
          <p className="text-text-muted mb-1 font-mono text-sm">No matches found.</p>
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
              className="group bg-bg-terminal border-border hover:border-border-hover rounded-lg border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(177,151,252,0.06)]"
            >
              <div className="text-text-muted mb-2.5 flex items-center gap-2 font-mono text-[0.6875rem]">
                <span
                  className="rounded px-1.5 py-0.5 font-medium"
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
              <h2
                className="text-text group-hover:text-accent mb-1.5 font-sans text-lg font-semibold transition-colors"
                style={{ color: undefined }}
              >
                {post.title}
              </h2>
              <p className="text-text-secondary mb-3 text-sm leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded px-2 py-0.5 text-[0.6875rem]"
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
        <div className="mt-8 flex items-center justify-center gap-3 font-mono text-sm">
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="border-border text-text-muted hover:border-border-hover hover:text-text disabled:hover:border-border disabled:hover:text-text-muted flex items-center gap-1 rounded-md border px-3 py-1.5 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={14} /> prev
          </button>
          <span className="text-text-muted">
            <span className="text-text">{currentPage}</span> / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="border-border text-text-muted hover:border-border-hover hover:text-text disabled:hover:border-border disabled:hover:text-text-muted flex items-center gap-1 rounded-md border px-3 py-1.5 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-30"
          >
            next <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Result count */}
      <p className="text-text-muted mt-4 text-center font-mono text-xs">
        {filtered.length} post{filtered.length === 1 ? '' : 's'}
        {activeTag ? ` tagged "${activeTag}"` : ''}
        {search ? ` matching "${search}"` : ''}
      </p>
    </div>
  );
}
