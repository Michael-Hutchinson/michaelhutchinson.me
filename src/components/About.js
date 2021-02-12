import React from 'react';
import Social from './shared/Social';
import wording from '../data/wording.json';

function About() {
  return (
    <section id="about">
      <h5>{wording[1].title}</h5>
      <h2>{wording[1].h2}</h2>
      <p>{wording[1].p1}</p>
      <p>{wording[1].p2}</p>
      <Social />
    </section>
  );
}

export default About;
