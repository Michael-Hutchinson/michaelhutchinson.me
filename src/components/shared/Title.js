import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const SubTitle = styled.h2`
  align-items: center;
  color: ${({ theme }) => theme.link};
  display: flex;
  font-size: clamp(1.625rem, 5vw, 2rem);
  font-family: var(--font-mono);
  margin: 0.625rem 0 2.5rem;
  white-space: nowrap;
  :after {
    content: '';
    display: block;
    position: relative;
    width: 12.5rem;
    height: 0.063rem;
    margin-left: 1.25rem;
    background-color: ${({ theme }) => theme.text};
    @media (max-width: 48rem) {
      width: 100%;
    }
  }
`;

function Title(props) {
  const { titleText } = props;
  return <SubTitle>{titleText}</SubTitle>;
}

Title.propTypes = {
  titleText: string.isRequired,
};

export default Title;
