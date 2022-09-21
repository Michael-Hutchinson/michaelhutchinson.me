import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Email from './components/shared/Email';
import Footer from './components/Footer';
import GlobalStyle from './styles/globalStyles';
import Darkmode from './components/shared/Darkmode';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const [theme, themeToggler] = Darkmode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Header theme={theme} toggleTheme={themeToggler} />
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
}

export default App;
