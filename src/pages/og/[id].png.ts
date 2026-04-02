import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((p) => p.data.published);
  return posts.map((post) => ({
    params: { id: post.id },
    props: { title: post.data.title, date: post.data.date, tags: post.data.tags },
  }));
}

export async function GET({ props }: APIContext) {
  const { title, date, tags } = props as { title: string; date: string; tags: string[] };

  // Use system font for satori (no need to bundle a font file)
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff'
  ).then((r) => r.arrayBuffer());

  const monoFontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff'
  ).then((r) => r.arrayBuffer());

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '1200px',
          height: '630px',
          background: '#1a1a2e',
          padding: '60px 70px',
          fontFamily: 'Inter',
        },
        children: [
          // Top: chevron + path
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'JetBrains Mono',
                fontSize: '18px',
              },
              children: [
                { type: 'span', props: { style: { color: '#b197fc', fontWeight: 700 }, children: '❯' } },
                { type: 'span', props: { style: { color: '#5a5a7a' }, children: `blog/${new Date(date).toISOString().split('T')[0]}` } },
              ],
            },
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                flex: 1,
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: '56px',
                      fontWeight: 700,
                      color: '#e8e8f0',
                      lineHeight: 1.15,
                      letterSpacing: '-0.03em',
                      margin: 0,
                    },
                    children: title,
                  },
                },
                // Tags
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '8px' },
                    children: tags.map((tag) => ({
                      type: 'span',
                      props: {
                        style: {
                          fontFamily: 'JetBrains Mono',
                          fontSize: '14px',
                          color: '#b197fc',
                          background: 'rgba(177,151,252,0.1)',
                          padding: '4px 12px',
                          borderRadius: '6px',
                        },
                        children: tag,
                      },
                    })),
                  },
                },
              ],
            },
          },
          // Bottom: author
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '24px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontFamily: 'JetBrains Mono', fontSize: '16px', color: '#8b8ba7' },
                    children: 'Michael Hutchinson — Staff Engineer',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#b197fc' },
                    children: 'michael-hutchinson.me',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: fontData, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: monoFontData, weight: 400, style: 'normal' },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
