# michael-hutchinson.me

Portfolio and blog built with Astro, React, and Tailwind CSS. Claude Code terminal-inspired design with typing animations, thinking indicators, and a full-featured blog platform.

## Stack

- **Astro** — Static site generation, SSR-ready, perfect SEO
- **React** — Interactive islands (hero terminal, conversation sections, blog search)
- **Tailwind CSS v4** — Utility-first styling with custom theme tokens
- **MDX** — Blog posts with component support
- **Satori + Sharp** — Auto-generated OG images per post

## Features

- Claude Code terminal aesthetic with animated typing, thinking dots, and phased reveals
- Dark/light theme with smooth crossfade transition
- Reusable `ConversationBlock` component powering all section animations
- Blog with search, tag filtering, pagination, reading time, TOC, copy code buttons, share links, related posts, prev/next navigation, and RSS feed
- JSON-LD structured data for Google rich results
- Auto-generated social preview images
- Sitemap + RSS feed
- Responsive design with mobile-first approach

## Development

```bash
npm run dev       # Start dev server on localhost:3000
npm run build     # Build static site to dist/
npm run preview   # Preview production build
```

## Deployment

```bash
npm run build && npm run deploy
```

Deploys to AWS S3 with CloudFront CDN.

## Blog

Posts live in `src/content/blog/` as MDX files. Add frontmatter:

```yaml
---
title: 'Post Title'
description: 'Short description'
date: '2026-04-02'
tags: ['AI', 'Engineering']
published: true
---
```

Set `published: false` to keep drafts hidden from the live site.
