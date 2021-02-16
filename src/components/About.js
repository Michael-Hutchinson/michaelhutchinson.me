import React from 'react';
import config from '../data/config.json';
import Title from './shared/Title';

const aboutWording = config.sections.about.p;
const techList = config.sections.about.list;

function About() {
  return (
    <section id="about">
      <Title titleText={config.sections.about.title} />
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
