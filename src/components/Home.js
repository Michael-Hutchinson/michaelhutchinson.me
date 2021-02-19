import React from 'react';
import styled from 'styled-components';
import Typed from 'react-typed';
import Button from './shared/Button';
import config from '../data/config.json';

const Name = styled.h5`
  color: ${({ theme }) => theme.link};
  font-family: var(--font-mono);
  margin: 0 0 0 0.25rem;
  font-size: 0.875rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: bold;
  margin: 0;
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0;
`;

const Text = styled.p`
  margin: 1.25rem 0 3.125rem;
`;

function Home() {
  return (
    <section id="home">
      <Name>{config.sections.home.title}</Name>
      <Title>
        <Typed strings={config.sections.home.h1} typeSpeed={60} />
      </Title>
      <SubTitle>{config.sections.home.h2}</SubTitle>
      <Text>{config.sections.home.p}</Text>
      <Button links="#about" buttonText="Learn more" />
    </section>
  );
}

export default Home;
