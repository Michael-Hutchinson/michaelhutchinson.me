import { useEffect, useState } from "react";
export const Darkmode = () => {
  const [theme, setTheme] = useState("light"),
    [mountedComponent, setMountedComponent] = useState(false),
    setMode = (mode) => {
      window.localStorage.setItem("theme", mode);
      setTheme(mode);
    },
    themeToggler = () => {
      theme === "light" ? setMode("dark") : setMode("light");
    };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    setMountedComponent(true);
  }, []);
  return [theme, themeToggler, mountedComponent];
};
