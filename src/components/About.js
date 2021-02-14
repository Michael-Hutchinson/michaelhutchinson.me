import React from 'react';
import config from '../data/config.json';

function About() {
  return (
    <section id="about">
      <h5>{config.sections.about.title}</h5>
      <h2>{config.sections.about.h2}</h2>
      <p>{config.sections.about.p[0]}</p>
      <p>{config.sections.about.p[1]}</p>
    </section>
  );
}

export default About;
