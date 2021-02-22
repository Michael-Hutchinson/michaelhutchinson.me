import React from 'react';
import styled from 'styled-components';
import ModalImage from 'react-modal-image';
import config from '../data/config.json';
import Title from './shared/Title';
import images from '../images';

const ImageWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.25rem;
  z-index: 20;
  @media (max-width: 48rem) {
    display: block;
  }
`;

function Work() {
  return (
    <section id="work">
      <Title titleText={config.sections.work.title} />
      <h3>{config.sections.work.h3}</h3>
      <ImageWrap>
        {images.map((img) => (
          <ModalImage
            className="modalImage"
            key={img.id}
            small={img[0]}
            large={img[0]}
            alt={img[1]}
          />
        ))}
      </ImageWrap>
    </section>
  );
}

export default Work;
