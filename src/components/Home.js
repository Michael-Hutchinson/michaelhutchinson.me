import React from 'react';
import styled from 'styled-components';
import Typed from 'react-typed';
import Button from './shared/Button';
import config from '../data/config.json';

const Name = styled.h5`
  color: ${({ theme }) => theme.link};
  font-family: var(--font-links);
  margin: 0 0 0 4px;
  font-size: 0.875rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin: 0;
  font-weight: bold;
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin: 0;
`;

function Home() {
  return (
    <section id="home">
      <Name>{config.sections.home.title}</Name>
      <Title>
        <Typed strings={config.sections.home.h1} typeSpeed={60} />
      </Title>
      <SubTitle>{config.sections.home.h2}</SubTitle>
      <p>{config.sections.home.p}</p>
      <Button links="#about" buttonText="Learn more" />
    </section>
  );
}

export default Home;
