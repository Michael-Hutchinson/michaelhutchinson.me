import React from 'react';
import config from '../data/config.json';
import Title from './shared/Title';

function Work() {
  return (
    <section id="work">
      <Title titleText={config.sections.work.title} />
      <h3>{config.sections.work.h3}</h3>
    </section>
  );
}

export default Work;
