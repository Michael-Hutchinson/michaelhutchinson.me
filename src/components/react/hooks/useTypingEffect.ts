import { useEffect, useState, useRef } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  enabled?: boolean;
}

export default function useTypingEffect({
  text,
  speed = 40,
  delay = 0,
  enabled = true,
}: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const cancelled = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayText('');
      setIsDone(false);
      return;
    }

    cancelled.current = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    const getCharDelay = (char: string): number => {
      if (char === ' ') return speed * 1.8 + Math.random() * speed * 0.5;
      if ('.?!,;:'.includes(char)) return speed * 3;
      if (Math.random() < 0.3) return speed * 0.3;
      return speed * (0.6 + Math.random() * 0.8);
    };

    const typeChar = () => {
      if (cancelled.current) return;
      if (charIndex < text.length) {
        const burst = charIndex < text.length - 1 && Math.random() < 0.2;
        charIndex += burst ? 2 : 1;
        setDisplayText(text.slice(0, charIndex));
        timeoutId = setTimeout(typeChar, getCharDelay(text[charIndex - 1]));
      } else {
        setIsDone(true);
      }
    };

    timeoutId = setTimeout(typeChar, delay);
    return () => {
      cancelled.current = true;
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, enabled]);

  return { displayText, isDone };
}
