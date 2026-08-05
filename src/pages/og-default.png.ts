import type { APIContext } from 'astro';
import { renderOgCard, span, GRADIENT } from '../lib/og';

export async function GET(_ctx: APIContext) {
  return renderOgCard({
    titleBar: 'michael@hutchinson: ~',
    command: 'whoami',
    body: [
      span('Michael Hutchinson', {
        fontSize: '68px',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        backgroundImage: GRADIENT,
        backgroundClip: 'text',
        color: 'transparent',
      }),
      span('Staff Engineer building AI-powered engineering cultures.', {
        fontSize: '27px',
        color: '#8b8ba7',
        lineHeight: 1.45,
      }),
    ],
    footerLeft: 'Manchester, UK',
    footerRight: 'michaelhutchinson.me',
  });
}
