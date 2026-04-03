import React, { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

const inputClass = "w-full bg-bg-terminal border border-border rounded-md font-mono text-[0.8125rem] text-text px-3.5 h-11 transition-all duration-150 placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:shadow-[0_0_0_3px_rgba(177,151,252,0.08)]";

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setMessage('Contact form is not configured. Please email me directly.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setStatus('success');
      setMessage("Message sent! I'll get back to you soon.");
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Try emailing me directly.');
    }
  };

  const isSending = status === 'sending';

  return (
    <form onSubmit={sendEmail} className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1">
        <div>
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input id="contact-name" className={inputClass} type="text" name="name" placeholder="name" required disabled={isSending} />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input id="contact-email" className={inputClass} type="email" name="email" placeholder="email" required disabled={isSending} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="sr-only">Subject</label>
        <input id="contact-subject" className={inputClass} type="text" name="subject" placeholder="subject" required disabled={isSending} />
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">Message</label>
        <textarea
          id="contact-message"
          className={`${inputClass} h-auto min-h-24 py-3 resize-y`}
          name="message"
          placeholder="message..."
          required
          disabled={isSending}
        />
      </div>
      <button
        type="submit"
        disabled={isSending}
        className="self-start px-6 py-2.5 rounded-md text-white font-mono text-[0.8125rem] font-medium transition-all duration-150 hover:opacity-90 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(177,151,252,0.2)] active:translate-y-0 mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{ background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-2), var(--color-accent-3))' }}
      >
        {isSending ? 'sending...' : 'send_message()'}
      </button>
      {message && (
        <p
          className="text-[0.8125rem] font-mono"
          style={{ color: status === 'error' ? 'var(--color-accent-3)' : 'var(--color-accent-green)' }}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
