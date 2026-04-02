import React, { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const inputClass = "w-full bg-bg-terminal border border-border rounded-md text-text font-mono text-[0.8125rem] px-3.5 h-11 transition-all duration-150 placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:shadow-[0_0_0_3px_rgba(177,151,252,0.08)]";

export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    e.preventDefault();

    emailjs
      .sendForm('service_n4cgb86', 'template_tjcmx0d', target, 'user_sT5IC7cV94BXANfidUr3y')
      .then(
        () => { setMessage("Message sent! I'll get back to you soon."); setIsError(false); },
        () => { setMessage('Something went wrong. Try emailing me directly.'); setIsError(true); }
      );
    target.reset();
  };

  return (
    <form onSubmit={sendEmail} className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1">
        <input className={inputClass} type="text" name="name" placeholder="name" required />
        <input className={inputClass} type="email" name="email" placeholder="email" required />
      </div>
      <input className={inputClass} type="text" name="subject" placeholder="subject" required />
      <textarea
        className={`${inputClass} h-auto min-h-24 py-3 resize-y`}
        name="message"
        placeholder="message..."
        required
      />
      <button
        type="submit"
        className="self-start px-6 py-2.5 bg-linear-to-r from-accent via-accent-2 to-accent-3 rounded-md text-white font-mono text-[0.8125rem] font-medium transition-all duration-150 hover:opacity-90 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(177,151,252,0.2)] active:translate-y-0 mt-1"
      >
        send_message()
      </button>
      {message && (
        <p className={`text-[0.8125rem] font-mono ${isError ? 'text-red-400' : 'text-accent-green'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
