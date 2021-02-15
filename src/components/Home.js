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
      <h2>{config.sections.home.h2}</h2>
      <p>{config.sections.home.p}</p>
      <Button links="#about" buttonText="Learn more" />
    </section>
  );
}

export default Home;
