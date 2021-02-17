import React from 'react';
import styled from 'styled-components';
import config from '../data/config.json';
import Title from './shared/Title';

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 3.125rem;
  @media (max-width: 48rem) {
    display: block;
  }
`;

const ListItems = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  list-style: none;
  margin: 1.25rem 0 0 0;
  overflow: hidden;
  padding: 0;
  li {
    position: relative;
    margin-bottom: 0.625rem;
    padding-left: 1.25rem;
    font-family: var(--font-links);
    font-size: 0.813rem;
    &:before {
      color: ${({ theme }) => theme.link};
      content: '▹';
      left: 0;
      position: absolute;
    }
  }
`;

const aboutWording = config.sections.about.p;
const techList = config.sections.about.list;

function About() {
  return (
    <section id="about">
      <Title titleText={config.sections.about.title} />
      <Wrap>
        <div>
          {aboutWording.map((p) => (
            <p key={p.id}>{p}</p>
          ))}
          <ListItems>
            {techList.map((list) => (
              <li key={list.id}>{list}</li>
            ))}
          </ListItems>
        </div>
        <div>
          <p>Image will go here when I find one</p>
        </div>
      </Wrap>
    </section>
  );
}

export default About;
