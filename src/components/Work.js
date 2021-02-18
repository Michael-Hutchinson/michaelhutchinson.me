import React from 'react';
import styled from 'styled-components';
import config from '../data/config.json';
import Title from './shared/Title';
import images from '../images';

const ImageWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.25rem;
  @media (max-width: 48rem) {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  border: 0.063rem solid ${({ theme }) => theme.link};
  border-radius: 0.25rem;
  padding: 0.313rem;
`;

function Work() {
  return (
    <section id="work">
      <Title titleText={config.sections.work.title} />
      <h3>{config.sections.work.h3}</h3>
      <ImageWrap>
        <Image src={images.aetc} alt="aetc" />
        <Image src={images.betting} alt="betting" />
        <Image src={images.leeds} alt="leeds" />
        <Image src={images.lscb} alt="lscb" />
        <Image src={images.morality} alt="morality" />
        <Image src={images.portfolio} alt="portfolio" />
        <Image src={images.runner} alt="runner" />
      </ImageWrap>
    </section>
  );
}

export default Work;
