import React from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Card from './ui/Card';
import LinkButton from './ui/LinkButton';
import { ease } from './ui/constants';

interface PostPreview {
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
}

interface WritingSectionProps {
  posts: PostPreview[];
}

function WritingSection({ posts }: Readonly<WritingSectionProps>) {
  return (
    <ConversationBlock
      prompt="show me Michael's latest posts"
      thinkingMessage="Reading ~/blog/..."
      thinkingDuration={1000}
    >
      {(visible) => (
        <>
          <motion.p
            className="mb-6 max-w-xl text-[0.9375rem]"
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Latest from the blog:
          </motion.p>

          <div className="flex flex-col gap-4">
            {posts.map((post, i) => (
              <Card
                key={post.id}
                href={`/blog/${post.id}`}
                accent="var(--color-accent)"
                hover
                animate={
                  visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
              >
                <div className="p-5">
                  <div className="text-text-muted mb-2 flex items-center gap-2 font-mono text-[0.6875rem]">
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
                  <h2 className="text-text group-hover:text-accent mb-1.5 font-sans text-base font-semibold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed">{post.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <motion.div
            className="mt-4 text-center"
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease, delay: 0.6 }}
          >
            <LinkButton href="/blog">view all posts</LinkButton>
          </motion.div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(WritingSection, 'WritingSection');
