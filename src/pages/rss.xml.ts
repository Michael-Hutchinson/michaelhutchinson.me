import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { isLive, byDateDesc } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).filter(isLive).sort(byDateDesc);

  return rss({
    title: 'Michael Hutchinson - Blog',
    description:
      'Thoughts on AI-powered engineering, technical leadership, and building great software.',
    site: context.site ?? new URL('https://michaelhutchinson.me'),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
