import React from 'react'
import Typed from 'react-typed'
import styled from 'styled-components'
import '../styles/default.scss';

const Title = styled.h1`
  color: ${props => props.theme.empressGrey};
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0.5px;
`;

const introText = [
  `I am a creative designer and web developer based in Manchester.`
];

function Home() {
  return (
    <section id="home">
      <h5>hey there, this is my portfolio website.</h5>
      <Title>
        <Typed strings={introText} typeSpeed={60} />
      </Title>
    </section>
  );
}

export default Home;
