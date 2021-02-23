import React, { useState } from 'react';
import styled from 'styled-components';
import config from '../data/config.json';
import Title from './shared/Title';
import images from '../images';
import Modal from './shared/Modal';

const ImageWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.25rem;
  z-index: 19;
  @media (max-width: 48rem) {
    display: block;
  }
`;

function Work() {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState();

  function toggleModal(e) {
    setImage(e.target.alt);
    setModal(!modal);
  }
  return (
    <section id="work">
      <Title titleText={config.sections.work.title} />
      <h3>{config.sections.work.h3}</h3>
      <ImageWrap>
        {images.map((img) => (
          <input
            type="image"
            className="modalImage"
            onClick={toggleModal}
            onKeyPress={toggleModal}
            key={img.id}
            src={img[0]}
            alt={img[1]}
          />
        ))}
      </ImageWrap>
      {modal ? <Modal alt={image} toggleModal={toggleModal} /> : null}
    </section>
  );
}

export default Work;
