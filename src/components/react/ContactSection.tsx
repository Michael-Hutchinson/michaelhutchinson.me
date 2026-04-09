import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import ContactForm from './ContactForm';
import withErrorBoundary from './withErrorBoundary';
import FileTab from './ui/FileTab';
import { ease } from './ui/constants';

const links = [
  {
    href: 'mailto:michael-hutchinson@hotmail.co.uk',
    icon: () => <Mail size={16} />,
    label: 'michael-hutchinson@hotmail.co.uk',
  },
  {
    href: 'https://github.com/Michael-Hutchinson',
    icon: GithubIcon,
    label: 'github.com/Michael-Hutchinson',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/mhutchinson4',
    icon: LinkedinIcon,
    label: 'linkedin.com/in/mhutchinson4',
    external: true,
  },
];

function ContactSection() {
  return (
    <ConversationBlock
      prompt='how can I get in touch?'
      thinkingMessage='Composing response...'
      thinkingDuration={1000}
    >
      {(visible) => (
        <>
          <motion.p
            className='text-[0.9375rem] max-w-lg mb-8 leading-relaxed'
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Whether you want to discuss a role, a project, or just talk shop
            about AI and engineering — I'd love to hear from you.
          </motion.p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Form card */}
            <motion.div
              className='bg-bg-terminal border border-border rounded-lg overflow-hidden'
              {...staggerItem(visible, 0, 0.15)}
            >
              <FileTab
                label='Edit'
                path='~/contact/new-message.yml'
                color='var(--color-accent-2)'
              />
              <div className='p-5'>
                <ContactForm />
              </div>
            </motion.div>

            {/* Links */}
            <div className='flex flex-col gap-2.5'>
              <motion.p
                className='text-[0.6875rem] uppercase tracking-wider mb-1'
                style={{ color: 'var(--color-text-muted)' }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                or connect directly
              </motion.p>
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className='group flex items-center gap-2.5 px-3.5 py-3 bg-bg-terminal border border-border rounded-md text-[0.8125rem] hover:border-border-hover hover:text-text'
                  style={{ color: 'var(--color-text-secondary)' }}
                  animate={
                    visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
                  }
                  transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <span
                    className='text-base shrink-0'
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <link.icon />
                  </span>
                  {link.label}
                  <ArrowUpRight
                    size={14}
                    className='ml-auto text-text-muted opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0'
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(ContactSection, 'ContactSection');
