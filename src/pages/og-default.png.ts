import type { APIContext } from 'astro';
import type React from 'react';
import satori from 'satori';
import sharp from 'sharp';

export async function GET(_ctx: APIContext) {
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff',
  ).then((r) => r.arrayBuffer());

  const monoFontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff',
  ).then((r) => r.arrayBuffer());

  const node = {
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
              {
                type: 'span',
                props: { style: { color: '#b197fc', fontWeight: 700 }, children: '❯' },
              },
              { type: 'span', props: { style: { color: '#5a5a7a' }, children: 'whoami' } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '12px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '52px', fontWeight: 700, color: '#b197fc', lineHeight: 1.1 },
                  children: 'Michael Hutchinson',
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: '24px', color: '#8b8ba7', lineHeight: 1.4 },
                  children: 'Staff Engineer building AI-powered engineering cultures.',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono',
              fontSize: '14px',
              color: '#5a5a7a',
            },
            children: [
              { type: 'span', props: { children: 'michaelhutchinson.me' } },
              { type: 'span', props: { children: 'Manchester, UK' } },
            ],
          },
        },
      ],
    },
  } as unknown as React.ReactNode;

  const svg = await satori(node, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fontData, weight: 700 as const, style: 'normal' as const },
      {
        name: 'JetBrains Mono',
        data: monoFontData,
        weight: 400 as const,
        style: 'normal' as const,
      },
    ],
  });

  const pngBuffer = await sharp(new Uint8Array(Buffer.from(svg)))
    .png()
    .toBuffer();

  return new Response(pngBuffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
