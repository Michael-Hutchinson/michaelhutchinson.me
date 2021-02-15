import React from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import Navbar from './shared/Navbar';

const Top = styled.header`
  display: flex;
  height: 5.188rem;
  z-index: 15;
  padding: 0 2.5rem;
`;

function Header() {
  return (
    <Top>
      <Navbar />
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
    </Top>
  );
}

export default Header;
