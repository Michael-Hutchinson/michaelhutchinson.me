import type { CollectionEntry } from 'astro:content';

export function isLive(post: CollectionEntry<'blog'>): boolean {
  return (
    post.data.published && (import.meta.env.DEV || new Date(post.data.date).valueOf() <= Date.now())
  );
}

export function byDateDesc(a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>): number {
  return new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
}

export function readingTimeMinutes(body: string | undefined): number {
  return Math.max(1, Math.ceil((body?.split(/\s+/).length || 0) / 250));
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface PostPreview {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

export function toPreview(post: CollectionEntry<'blog'>): PostPreview {
  return {
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    tags: post.data.tags,
    readingTime: readingTimeMinutes(post.body),
  };
}
