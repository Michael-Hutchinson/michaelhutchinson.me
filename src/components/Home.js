import React from 'react';
import Typed from 'react-typed';
import Button from './shared/Button';
import config from '../data/config.json';

function Home() {
  return (
    <section id="home">
      <h5>{config.sections.home.title}</h5>
      <h1>
        <Typed strings={config.sections.home.h1} typeSpeed={60} />
      </h1>
      <Button />
    </section>
  );
}

export default Home;
