import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => p.data.published)
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: 'Michael Hutchinson — Blog',
    description:
      'Thoughts on AI-powered engineering, technical leadership, and building great software.',
    site: context.site ?? new URL('https://michael-hutchinson.me'),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
