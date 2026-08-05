import satori from 'satori';
import sharp from 'sharp';

const GRADIENT = 'linear-gradient(135deg, #b197fc 0%, #da77f2 50%, #ffa07a 100%)';

type OgNode = {
  type: string;
  props: {
    style?: Record<string, string | number>;
    children?: OgNode | OgNode[] | string;
  };
};

function span(text: string, style: Record<string, string | number>): OgNode {
  return { type: 'span', props: { style, children: text } };
}

function trafficLights(): OgNode {
  const dot = (color: string): OgNode => ({
    type: 'div',
    props: {
      style: { width: '14px', height: '14px', borderRadius: '7px', background: color },
    },
  });
  return {
    type: 'div',
    props: {
      style: { display: 'flex', gap: '9px' },
      children: [dot('#ff5f57'), dot('#febc2e'), dot('#28c840')],
    },
  };
}

function promptLine(command: string): OgNode {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        fontFamily: 'JetBrains Mono',
        fontSize: '22px',
      },
      children: [
        span('mh~$', {
          backgroundImage: GRADIENT,
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 400,
        }),
        span(command, { color: '#8b8ba7' }),
      ],
    },
  };
}

interface TerminalCard {
  titleBar: string;
  command: string;
  body: OgNode[];
  footerLeft: string;
  footerRight: string;
}

function terminalCard({ titleBar, command, body, footerLeft, footerRight }: TerminalCard): OgNode {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '1200px',
        height: '630px',
        padding: '52px 72px',
        background:
          'radial-gradient(ellipse 700px 450px at 12% 0%, rgba(177,151,252,0.13), transparent), radial-gradient(ellipse 700px 450px at 90% 100%, rgba(255,160,122,0.09), transparent), #0f0f1c',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              background: '#1a1a2e',
              borderRadius: '18px',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              overflow: 'hidden',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '18px 26px',
                    background: '#16162a',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  },
                  children: [
                    trafficLights(),
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          marginLeft: '-69px',
                        },
                        children: span(titleBar, {
                          fontFamily: 'JetBrains Mono',
                          fontSize: '17px',
                          color: '#5a5a7a',
                        }),
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
                    flexDirection: 'column',
                    flex: 1,
                    padding: '44px 56px 40px',
                  },
                  children: [
                    promptLine(command),
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'center',
                          gap: '24px',
                        },
                        children: body,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid rgba(255,255,255,0.07)',
                          paddingTop: '26px',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '17px',
                        },
                        children: [
                          span(footerLeft, { color: '#8b8ba7' }),
                          span(footerRight, { color: '#b197fc' }),
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export async function renderOgCard(card: TerminalCard): Promise<Response> {
  const [inter, mono] = await Promise.all([
    fetch('https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff').then(
      (r) => r.arrayBuffer(),
    ),
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff',
    ).then((r) => r.arrayBuffer()),
  ]);

  const svg = await satori(terminalCard(card) as unknown as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: inter, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });

  const png = await sharp(new Uint8Array(Buffer.from(svg)))
    .png()
    .toBuffer();

  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

export { span, GRADIENT };
export type { OgNode };
