import React from 'react';
import wording from '../data/wording.json';

function Work() {
  return (
    <section id="work">
      <h5>{wording[2].title}</h5>
      <h3>{wording[2].h3}</h3>
    </section>
  );
}

export default Work;
