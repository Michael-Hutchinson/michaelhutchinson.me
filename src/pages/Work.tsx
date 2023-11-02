import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import config from '../data/config.json';
import Title from '../components/Title/Title';
import images from '../images';
import Modal from '../components/Modal/Modal';

const ImageWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.25rem;
  z-index: 19;
  @media (max-width: 48rem) {
    display: block;
  }
`;

const Work = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState('');

  const toggleModal = (
    e:
      | React.MouseEvent<HTMLImageElement | HTMLInputElement>
      | React.KeyboardEvent<HTMLImageElement | HTMLInputElement>
  ) => {
    const target = e.currentTarget;

    setImage(target.alt);
    setModal(!modal);
  };

  return (
    <section id="work">
      <Title titleText={config.sections.work.title} />
      <h3>{config.sections.work.h3}</h3>
      <ImageWrap>
        {images.map((img) => (
          <LazyLoadImage
            className="modalImage"
            onClick={toggleModal}
            onKeyPress={toggleModal}
            key={img[0]}
            src={img[0]}
            alt={img[1]}
          />
        ))}
      </ImageWrap>
      {modal ? <Modal alt={image} toggleModal={toggleModal} /> : null}
    </section>
  );
};

export default Work;
