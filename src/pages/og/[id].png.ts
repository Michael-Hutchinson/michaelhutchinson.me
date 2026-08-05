import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { isLive } from '../../lib/posts';
import { renderOgCard, span, type OgNode } from '../../lib/og';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter(isLive);
  return posts.map((post) => ({
    params: { id: post.id },
    props: { title: post.data.title, date: post.data.date, tags: post.data.tags },
  }));
}

export async function GET({ props }: APIContext) {
  const { title, date, tags } = props as { title: string; date: string; tags: string[] };
  const isoDate = new Date(date).toISOString().split('T')[0];

  const tagRow: OgNode = {
    type: 'div',
    props: {
      style: { display: 'flex', gap: '10px' },
      children: tags.map((tag) =>
        span(tag, {
          fontFamily: 'JetBrains Mono',
          fontSize: '16px',
          color: '#b197fc',
          background: 'rgba(177,151,252,0.1)',
          border: '1px solid rgba(177,151,252,0.25)',
          padding: '6px 16px',
          borderRadius: '8px',
        }),
      ),
    },
  };

  return renderOgCard({
    titleBar: 'michael@hutchinson: ~/blog',
    command: `cat ${isoDate}.md`,
    body: [
      span(title, {
        fontSize: title.length > 45 ? '50px' : '58px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        color: '#e8e8f0',
      }),
      tagRow,
    ],
    footerLeft: 'Michael Hutchinson - Staff Engineer',
    footerRight: 'michaelhutchinson.me',
  });
}
