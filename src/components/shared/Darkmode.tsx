import { useEffect, useState } from 'react';

const Darkmode = (): [string, () => void] => {
  const [theme, setTheme] = useState('light');

  const setMode = (mode: 'light' | 'dark') => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (
      window.matchMedia?.('(prefers-color-scheme: dark)')?.matches &&
      !localTheme
    ) {
      setMode('dark');
    } else if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode('light');
    }
  });
  return [theme, themeToggler];
};

export default Darkmode;
