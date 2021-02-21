import React from 'react';
import { ThemeProvider } from 'styled-components';
import Particles from 'react-particles-js';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Social from './components/shared/Social';
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
      <Particles
        width="100vw"
        height="100vh"
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: 'top',
              out_mode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
      <Header theme={theme} toggleTheme={themeToggler} />
      <main>
        <Home />
        <About />
        <Work />
        <Contact />
        <Social />
        <Email />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
