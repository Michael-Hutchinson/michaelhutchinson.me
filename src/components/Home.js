import React from 'react';
import Typed from 'react-typed';
import Button from './shared/Button';
import wording from '../data/wording.json';

function Home() {
  return (
    <section id="home">
      <h5>{wording[0].title}</h5>
      <h1>
        <Typed strings={wording[0].h1} typeSpeed={60} />
      </h1>
      <Button />
    </section>
  );
}

export default Home;
