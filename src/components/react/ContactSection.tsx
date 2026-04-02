import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import ConversationBlock, { stagger, staggerStyle } from './ConversationBlock';
import ContactForm from './ContactForm';

const links = [
  { href: 'mailto:michael-hutchinson@hotmail.co.uk', icon: () => <Mail size={16} />, label: 'michael-hutchinson@hotmail.co.uk' },
  { href: 'https://github.com/Michael-Hutchinson', icon: GithubIcon, label: 'github.com/Michael-Hutchinson', external: true },
  { href: 'https://www.linkedin.com/in/mhutchinson4', icon: LinkedinIcon, label: 'linkedin.com/in/mhutchinson4', external: true },
];

export default function ContactSection() {
  return (
    <ConversationBlock prompt="how can I get in touch?" thinkingMessage="Composing response..." thinkingDuration={1000}>
      {(visible) => (
        <>
          <p
            className={`text-[0.9375rem] text-text-secondary max-w-lg mb-8 leading-relaxed ${stagger(visible, 0)}`}
            style={staggerStyle(0, 0.05)}
          >
            Whether you want to discuss a role, a project, or just talk shop about AI and engineering — I'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form card */}
            <div
              className={`bg-bg-terminal border border-border rounded-lg overflow-hidden ${stagger(visible, 0)} ${visible ? 'scale-100' : 'scale-[0.97]'}`}
              style={staggerStyle(0, 0.15)}
            >
              <div className="flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted">
                <span className="text-[0.625rem] px-1.5 py-0.5 rounded font-medium" style={{ background: 'color-mix(in srgb, var(--color-accent-2) 10%, transparent)', color: 'var(--color-accent-2)' }}>Edit</span>
                ~/contact/new-message.yml
              </div>
              <div className="p-5">
                <ContactForm />
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2.5">
              <p
                className={`text-[0.6875rem] text-text-muted uppercase tracking-wider mb-1 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '0.25s' }}
              >
                or connect directly
              </p>
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`
                    group flex items-center gap-2.5 px-3.5 py-3 bg-bg-terminal border border-border rounded-md text-[0.8125rem] text-text-secondary
                    transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:border-border-hover hover:text-text hover:translate-x-1
                    ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}
                  `}
                  style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
                >
                  <span className="text-base shrink-0" style={{ color: 'var(--color-accent)' }}><link.icon /></span>
                  {link.label}
                  <ArrowUpRight size={14} className="ml-auto text-text-muted opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </ConversationBlock>
  );
}
