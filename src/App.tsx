import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Email from './components/Email/Email';
import Footer from './components/Footer/Footer';
import GlobalStyle from './styles/globalStyles';
import Darkmode from './hooks/Darkmode';
import Particle from './components/Particles/Particles';
import { lightTheme, darkTheme } from './styles/theme';

const App = () => {
  const [theme, themeToggler] = Darkmode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Particle />
      <Header toggleTheme={themeToggler} />
      <main>
        <Home />
        <About />
        <Work />
        <Contact />
        <Email />
        <Footer />
      </main>
    </ThemeProvider>
  );
};

export default App;
