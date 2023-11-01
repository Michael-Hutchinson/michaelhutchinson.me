import React from 'react';
import { ThemeProvider } from 'styled-components';
import Particles from 'react-tsparticles';
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

const App = () => {
  const [theme, themeToggler] = Darkmode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 120,
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
          particles: {
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 6,
              straight: false,
            },
            number: {
              value: 160,
              density: {
                enable: false,
              },
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
          },
          detectRetina: true,
        }}
      />
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
};

export default App;
