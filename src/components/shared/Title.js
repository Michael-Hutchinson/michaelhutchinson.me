import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.title};
  display: flex;
  align-items: center;
  margin: 0.625rem 0 2.5rem;
  font-size: clamp(1.625, 5vw, 2);
  :before {
    position: relative;
    counter-increment: section 1;
    content: '0' counter(section) '.';
    margin-right: 0.625;
    color: var(--gold);
    font-family: var(--font-links);
    font-size: clamp(1rem, 3vw, 1.25rem);
    bottom: -0.188rem;
  }
  :after {
    content: '';
    display: block;
    position: relative;
    width: 12.5rem;
    height: 0.063rem;
    margin-left: 1.25rem;
    background-color: ${({ theme }) => theme.text};
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
