import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toggle from './components/shared/Toggle';
import GlobalStyle from './styles/globalStyles';
import Darkmode from './components/shared/Darkmode';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const [theme, themeToggler, mountedComponent] = Darkmode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Toggle theme={theme} toggleTheme={themeToggler} />
      <Header />
      <Home />
      <About />
      <Work />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
