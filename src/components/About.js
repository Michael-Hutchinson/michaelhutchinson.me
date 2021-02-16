import React from 'react';
import config from '../data/config.json';

const aboutWording = config.sections.about.p;
const techList = config.sections.about.list;

function About() {
  return (
    <section id="about">
      <h5>{config.sections.about.title}</h5>
      {aboutWording.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <ul>
        {techList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
    </section>
  );
}

export default About;
