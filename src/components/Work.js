import React from 'react';
import config from '../data/config.json';

function Work() {
  return (
    <section id="work">
      <h5>{config.sections.work.title}</h5>
      <h3>{config.sections.work.h3}</h3>
    </section>
  );
}

export default Work;
